import { createApp } from 'vue'
import App from './App.vue'

//Importamos rutas
import router from '@/router/router'

createApp(App)
    .use( router )
    .mount('#app')
