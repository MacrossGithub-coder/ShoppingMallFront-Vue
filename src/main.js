import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//路由拦截，拦截全部路由，每次操作路由都被拦截进行判断
router.beforeEach((to, from, next) => {

  const token = localStorage.getItem("token");

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (token) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next();
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
