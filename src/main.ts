import { createApp } from 'vue'
import App from '@/App.vue'
// --------------------------------------

import ElementPlus from 'element-plus'

import "@/style/reset.scss";
import 'element-plus/dist/index.css'
import '@/style/index.scss'

import router from '@/router/'
import { store } from '@/store/'
import { Request } from '@/util/request'
import VueAxios from 'vue-axios'

// --------------------------------------

const app = createApp(App)
// --------------------------------------

app.use(router)
app.use(store)

app.use(ElementPlus, { size: 'small', zIndex: 3000 })

app.config.globalProperties.$axios = Request
app.use(VueAxios, Request.init())
// --------------------------------------
app.mount('#app')
