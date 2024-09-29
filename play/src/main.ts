import acornUi from 'acorn-ui'
import { createApp } from 'vue'

import App from './App.vue'
import 'acorn-ui/dist/index.css'

createApp(App).use(acornUi).mount('#app')
