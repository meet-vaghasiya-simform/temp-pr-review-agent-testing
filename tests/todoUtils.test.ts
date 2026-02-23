import { describe, it, expect } from 'vitest'
import { computeNextDue, parseTags } from '../utils/todoUtils'

describe('todoUtils', () => {
  it('computes next due for daily recurrence', () => {
    const next = computeNextDue('2024-01-01', { interval: 'daily' })
    expect(next).toBe('2024-01-02')
  })

  it('computes next due for weekly recurrence', () => {
    const next = computeNextDue('2024-01-01', { interval: 'weekly' })
    expect(next).toBe('2024-01-08')
  })

  it('parses tags correctly', () => {
    expect(parseTags('one, two, ,three')).toEqual(['one','two','three'])
  })
})
