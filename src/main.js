import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue'
import router from './router'
import store from "./store";
import App from './App.vue'
import { FontAwesomeIcon } from './plugins/font-awesome'
import setupInterceptors from './services/setupInterceptors';

setupInterceptors(store);

const app = createApp(App)
app.use(router)
app.use(store)
app.component('font-awesome-icon', FontAwesomeIcon)

window.vm = app.mount('#app')

import 'bootstrap/dist/js/bootstrap.js'
