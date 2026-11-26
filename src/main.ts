import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@fontsource/barlow-condensed/latin-700.css'
import '@fontsource-variable/manrope'
import './styles/global.css'
import './styles/pages.css'
import App from './App.vue'
import { router } from './router'
import { persistDemoCart } from './stores/commerce'

const app = createApp(App).use(createPinia())
persistDemoCart()
app.use(router).mount('#app')
