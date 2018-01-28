import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './store/'

// axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
axios.interceptors.request.use(function (config) { // 配置发送请求的信息
  store.dispatch('showLoading')
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) { // 配置请求回来的信息
  store.dispatch('hideLoading')
  return response
}, function (error) {
  return Promise.reject(error)
})
axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = axios// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (window.sessionStorage.userInfo) {
  store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.userInfo))
}

Vue.use(ElementUI)
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})
// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.userInfo.user_id) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
    console.log('================')
  } else {
    console.log('nnnnnnnnnnnnnnnnnn')
    next()
  }
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
