// https://nuxt.com/docs/api/configuration/nuxt-config
import { MyLaraPreset, MyNoirPreset } from './primevue/preset';

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    css: ['~/assets/css/main.css', 'primeicons/primeicons.css'],
    modules: ['@nuxtjs/google-fonts', '@primevue/nuxt-module'],
    googleFonts: {
        families: {
            Lato: [300, 400, 700],
        },
    },
    primevue: {
        options: {
            theme: {
                preset: MyNoirPreset,
                options: {
                    prefix: 'p',
                    darkModeSelector: 'selector',
                    cssLayer: false,
                },
            },
        },
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
});
