import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios_config from './axios-config'

axios_config

createApp(App).use(store).use(router).mount('#app')
