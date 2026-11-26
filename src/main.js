import { createSSRApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import './assets/form.css'
import './assets/motion.css'

createSSRApp(App).mount('#app')
