<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

type Priority = 'low' | 'medium' | 'high'

interface Subtask { id: string; title: string; done: boolean }
interface Todo { id: string; title: string; description?: string; completed: boolean; priority: Priority; due?: string | null; tags: string[]; subtasks: Subtask[]; createdAt: number; recurring?: { interval: 'daily'|'weekly'|'monthly' }; order?: number }

// LocalStorage key kept inside component (no external composable per request)
const STORAGE_KEY = 'todos-v1'
const todos = ref<Todo[]>([])
try {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) todos.value = JSON.parse(raw)
} catch (e) {
  // ignore parse errors
}

// ensure order field exists and is consistent
if (todos.value.length && todos.value.some(t => typeof t.order !== 'number')) {
  todos.value.forEach((t, i) => { t.order = i })
}

watch(todos, (v) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
  } catch (e) {
    // ignore quota errors
  }
}, { deep: true })

const newTitle = ref('')
const newPriority = ref<Priority>('medium')
const newDue = ref<string | null>(null)
const newTags = ref('')
const newRecurring = ref<'none'|'daily'|'weekly'|'monthly'>('none')
const search = ref('')
const filter = ref<'all'|'active'|'completed'>('all')
const sortBy = ref<'created'|'priority'|'due'>('created')

function makeId() { return Date.now().toString(36) + Math.random().toString(36).slice(2,8) }

function addTodo() {
  if (!newTitle.value.trim()) return
  const t: Todo = { id: makeId(), title: newTitle.value.trim(), description: '', completed: false, priority: newPriority.value, due: newDue.value || null, tags: newTags.value ? newTags.value.split(',').map(s=>s.trim()).filter(Boolean) : [], subtasks: [], createdAt: Date.now(), recurring: newRecurring.value === 'none' ? undefined : { interval: newRecurring.value }, order: 0 }
  todos.value.unshift(t)
  // renumber orders to persist user ordering
  todos.value.forEach((it, idx) => { it.order = idx })
  newTitle.value = ''
  newTags.value = ''
  newDue.value = null
  newPriority.value = 'medium'
  newRecurring.value = 'none'
  maybeNotify(t)
}

function toggleComplete(t: Todo, checked?: boolean) {
  const wasCompleted = t.completed
  const newVal = typeof checked === 'boolean' ? checked : !t.completed
  t.completed = newVal
  // if marking completed and recurring, create next occurrence
  if (!wasCompleted && t.completed && t.recurring) {
    let nextDue: string | null = null
    if (t.due) {
      const d = new Date(t.due)
      if (t.recurring.interval === 'daily') d.setDate(d.getDate() + 1)
      if (t.recurring.interval === 'weekly') d.setDate(d.getDate() + 7)
      if (t.recurring.interval === 'monthly') d.setMonth(d.getMonth() + 1)
      nextDue = d.toISOString().slice(0,10)
    }
    const next: Todo = { ...t, id: makeId(), completed: false, createdAt: Date.now(), due: nextDue, order: 0 }
    todos.value.unshift(next)
    todos.value.forEach((it, idx) => { it.order = idx })
  }
}
function removeTodo(id: string) { todos.value = todos.value.filter(t=>t.id!==id) }
function addSubtask(todo: Todo, title: string) { if (!title.trim()) return; todo.subtasks.push({ id: makeId(), title: title.trim(), done: false }) }

// Editing state
const editingId = ref<string | null>(null)
const editTitle = ref('')
const editPriority = ref<Priority>('medium')
const editDue = ref<string | null>(null)
const editTags = ref('')

function startEdit(t: Todo) {
  editingId.value = t.id
  editTitle.value = t.title
  editPriority.value = t.priority
  editDue.value = t.due ?? null
  editTags.value = t.tags.join(', ')
}

function saveEdit(t: Todo) {
  if (!editingId.value) return
  t.title = editTitle.value.trim() || t.title
  t.priority = editPriority.value
  t.due = editDue.value || null
  t.tags = editTags.value ? editTags.value.split(',').map(s=>s.trim()).filter(Boolean) : []
  editingId.value = null
}

function cancelEdit() { editingId.value = null }

// Drag and drop support
let dragId: string | null = null
function onDragStart(t: Todo, e: DragEvent) {
  dragId = t.id
  try { e.dataTransfer?.setData('text/plain', t.id) } catch (e) {}
}

function onDrop(target: Todo, e: DragEvent) {
  e.preventDefault()
  const id = dragId ?? e.dataTransfer?.getData('text/plain')
  if (!id) return
  if (id === target.id) return
  const from = todos.value.findIndex(x=>x.id===id)
  const to = todos.value.findIndex(x=>x.id===target.id)
  if (from === -1 || to === -1) return
  const [item] = todos.value.splice(from, 1)
  todos.value.splice(to, 0, item)
  // renumber order after reordering
  todos.value.forEach((it, idx) => { it.order = idx })
  dragId = null
}

function exportTodos() {
  const blob = new Blob([JSON.stringify(todos.value, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'todos.json'
  a.click()
  URL.revokeObjectURL(url)
}

function importTodos(file: File | null) {
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result))
      if (Array.isArray(parsed)) {
        const items = parsed.map((p: any) => ({ ...p, id: makeId(), createdAt: Date.now() }))
        todos.value = items.concat(todos.value)
      }
    } catch (e) {
      // ignore
    }
  }
  reader.readAsText(file)
}

function clearCompleted() { todos.value = todos.value.filter(t => !t.completed) }

const filtered = computed(() => {
  let list = todos.value.slice()
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(t => t.title.toLowerCase().includes(q) || (t.description||'').toLowerCase().includes(q) || t.tags.join(' ').toLowerCase().includes(q))
  }
  if (filter.value === 'active') list = list.filter(t => !t.completed)
  if (filter.value === 'completed') list = list.filter(t => t.completed)
  if (sortBy.value === 'priority') {
    const rank = { high: 0, medium: 1, low: 2 }
    list.sort((a,b)=> rank[a.priority] - rank[b.priority])
  } else if (sortBy.value === 'due') {
    list.sort((a,b)=> {
      if (!a.due) return 1
      if (!b.due) return -1
      return (new Date(a.due).getTime() - new Date(b.due).getTime())
    })
  } else {
    // When not sorting by priority/due, prefer persisted manual order if present
    const hasOrder = list.every(t => typeof t.order === 'number')
    if (hasOrder) {
      list.sort((a,b) => (a.order ?? 0) - (b.order ?? 0))
    } else {
      list.sort((a,b)=> b.createdAt - a.createdAt)
    }
  }
  return list
})

function maybeNotify(t: Todo) {
  if (!('Notification' in window)) return
  if (!t.due) return
  const due = new Date(t.due).getTime()
  const now = Date.now()
  if (due - now <= 60_000) {
    if (Notification.permission === 'granted') {
      new Notification('Todo due soon', { body: t.title })
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(p=> { if (p==='granted') new Notification('Todo due soon', { body: t.title }) })
    }
  }
}

onMounted(() => {})

watch(todos, () => {}, { deep: true })
</script>

<template>
  <div class="max-w-3xl mx-auto p-4">
    <h2 class="text-2xl font-semibold mb-4">Todo App</h2>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
      <input v-model="newTitle" placeholder="Add a task..." class="col-span-2 p-2 border rounded" />
      <select v-model="newPriority" class="p-2 border rounded">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select v-model="newRecurring" class="p-2 border rounded">
        <option value="none">No repeat</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <input v-model="newDue" type="date" class="p-2 border rounded col-span-1 sm:col-span-1" />
      <input v-model="newTags" placeholder="tags (comma)" class="p-2 border rounded col-span-2" />
      <button @click="addTodo" class="p-2 bg-blue-600 text-white rounded">Add</button>
    </div>

    <div class="flex gap-2 items-center mb-4">
      <input v-model="search" placeholder="Search" class="p-2 border rounded flex-1" />
      <select v-model="filter" class="p-2 border rounded">
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
      <select v-model="sortBy" class="p-2 border rounded">
        <option value="created">Newest</option>
        <option value="priority">Priority</option>
        <option value="due">Due</option>
      </select>
      <button @click="clearCompleted" class="p-2 border rounded">Clear Completed</button>
      <button @click="exportTodos" class="p-2 border rounded">Export</button>
      <label class="p-2 border rounded cursor-pointer">
        Import
        <input type="file" @change="e => importTodos(e.target.files?.[0] ?? null)" class="hidden" />
      </label>
    </div>

    <ul class="space-y-2">
      <li v-for="t in filtered" :key="t.id" class="p-3 border rounded flex justify-between items-start" draggable="true" @dragstart="(e) => onDragStart(t, e)" @dragover.prevent @drop="(e) => onDrop(t, e)">
        <div class="flex-1">
          <div class="flex items-center gap-3">
            <input type="checkbox" :checked="t.completed" @change="(e) => toggleComplete(t, (e.target as HTMLInputElement).checked)" />
            <div>
              <div v-if="editingId !== t.id" :class="{'line-through text-gray-400': t.completed}" class="font-medium">{{ t.title }}</div>
              <div v-else class="font-medium">
                <input v-model="editTitle" class="p-1 border rounded" />
              </div>
              <div class="text-sm text-gray-500">Priority: {{ t.priority }} <span v-if="t.due"> • Due: {{ t.due }}</span></div>
              <div class="text-xs text-gray-600 mt-1">Tags: <span v-for="tag in t.tags" :key="tag" class="mr-1">{{ tag }}</span></div>
            </div>
          </div>
          <div class="mt-2">
            <div v-for="st in t.subtasks" :key="st.id" class="text-sm">
              <input type="checkbox" v-model="st.done" class="mr-2" />{{ st.title }}
            </div>
            <div class="mt-2">
              <input placeholder="Add subtask" @keyup.enter="(e) => { addSubtask(t, (e.target as HTMLInputElement).value); (e.target as HTMLInputElement).value=''; }" class="p-1 border rounded" />
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2 pl-4">
          <template v-if="editingId !== t.id">
            <button @click="() => startEdit(t)" class="text-blue-600">Edit</button>
            <button @click="() => removeTodo(t.id)" class="text-red-600">Delete</button>
          </template>
          <template v-else>
            <div class="flex gap-2">
              <select v-model="editPriority" class="p-1 border rounded">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <input v-model="editDue" type="date" class="p-1 border rounded" />
            </div>
            <input v-model="editTags" placeholder="tags (comma)" class="p-1 border rounded mt-1" />
            <div class="flex gap-2 mt-2">
              <button @click="() => saveEdit(t)" class="p-1 bg-green-600 text-white rounded">Save</button>
              <button @click="cancelEdit" class="p-1 border rounded">Cancel</button>
            </div>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
