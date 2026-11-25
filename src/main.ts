import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@fontsource/barlow-condensed/latin-700.css'
import '@fontsource-variable/manrope'
import './styles/global.css'
import './styles/pages.css'
import App from './App.vue'
import { router } from './router'

createApp(App).use(createPinia()).use(router).mount('#app')
