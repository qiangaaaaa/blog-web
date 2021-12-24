import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router';

import mavonEditor from 'mavon-editor'
import ElementUI from 'element-ui';

import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(mavonEditor)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
