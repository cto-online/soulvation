import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router/index'
import App from './App.vue'
import vuetify from './plugins/vuetify'

// Styles
import '@mdi/font/css/materialdesignicons.css'
import '@/styles/main.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
