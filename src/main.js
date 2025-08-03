import './assets/styles.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as bootstrap from 'bootstrap'

window.bootstrap = bootstrap
const app = createApp(App)

app.use(router)

app.mount('#app')
