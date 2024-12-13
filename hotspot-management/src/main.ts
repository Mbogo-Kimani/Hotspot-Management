import './assets/main.css'
import App from './App.vue'
import router from './router/index'
import "element-plus/dist/index.css";


import { createApp } from 'vue'
import { createPinia } from 'pinia'



const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
