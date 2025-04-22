// import "@babel/polyfill";
// import Es6Promise from 'es6-promise'
// Es6Promise.polyfill()
import './assets/main.css'
//引入Vant4样式
import 'vant/lib/index.css';
// 引入TDesign样式
import 'tdesign-mobile-vue/es/style/index.css';

import {Quasar} from 'quasar'
// 导入 Quasar 样式和图标
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pina from './store/index'
import Vant from 'vant';
//引入所有组件
import TDesign from 'tdesign-mobile-vue';

import NutUI from "@nutui/nutui";
import "@nutui/nutui/dist/style.css";

import Varlet from '@varlet/ui'
import '@varlet/ui/es/varlet.css'
import { Themes, StyleProvider } from '@varlet/ui'

// import webSocketPlugin from './store/plugin/webSocketPlugin';
const app =  createApp(App)

    app.use(router)
     .use(pina)
     .use(Vant)
     .use(TDesign)
    .use(Quasar)
     .use(NutUI)
     .use(Varlet)
     // .use(webSocketPlugin)
const viewportTheme = Themes.toViewport(Themes.md3Light, {
    viewportWidth: 375,
    unitPrecision: 6,
    unitToConvert: 'px',
    viewportUnit: 'vmin',
    fontViewportUnit: 'vmin',
    propList: ['*'],
})
StyleProvider(viewportTheme)
// StyleProvider(Themes.md3Light)
   app .mount('#app')
// Material Design 3 亮色模式

