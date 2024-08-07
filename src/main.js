// import "@babel/polyfill";
// import Es6Promise from 'es6-promise'
// Es6Promise.polyfill()
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

 createApp(App)
    .use(router)
    .mount('#app')
