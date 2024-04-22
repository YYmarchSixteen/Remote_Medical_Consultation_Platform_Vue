import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'//样式文件
import * as ElIconModules from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'


import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // 引入样式
import 'quill/dist/quill.snow.css' // snow theme
import 'quill/dist/quill.bubble.css' // bubble theme
// 在src/main.js进行全局引入
import Vant from 'vant'
import 'vant/lib/index.css';




const app = createApp(App)
for(let iconName in ElIconModules){
    app.component(iconName,ElIconModules[iconName])
}

app.use(ElementPlus, {
    locale: zhCn,
  })
app.use(store)
app.use(VueQuillEditor)
app.use(router)

app.use(ElIconModules)
app.use(Vant)

app.mount('#app')


