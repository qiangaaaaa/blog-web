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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin)) { // 判断该路由是否需要登录权限
    if (sessionStorage.getItem('loginInfo')) { // 判断当前用户的登录信息loginInfo是否存在
      next();
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next();
  }

})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')