import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import router from '@/router/index.js';
import ToastService from 'primevue/toastservice';
import { createPinia } from 'pinia'


const pinia = createPinia()
const app = createApp(App)    
app.use(pinia)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
    }
})
app.use(ToastService)
app.use(router)
app.mount('#app')
