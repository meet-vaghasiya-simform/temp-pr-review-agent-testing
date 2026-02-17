<template>
    <div class="flex flex-col min-h-screen">
        <Header />
        <main class="grow md:container mx-2 md:mx-auto">
            <slot />
        </main>
        <Footer />
    </div>
</template>

<script setup>
import Header from '~/components/layout/Header.vue';
import Footer from '~/components/layout/Footer.vue';
</script>
