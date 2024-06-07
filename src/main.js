import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Lara from './presets/lara'
import './style.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(PrimeVue, { unstyled: true, pt: Lara })
app.use(ToastService)
app.use(ConfirmationService)

app.use(pinia)
app.use(router)

app.mount('#app')
