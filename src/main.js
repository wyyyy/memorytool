import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './store/store'
import api from './api/api'
Vue.prototype.$api = api
Vue.use(ElementUI)
Vue.use(VueRouter)

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
  // console.log('store.dispatch-' + JSON.parse(window.sessionStorage.userInfo))
  // store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.userInfo))
} else {
  console.log('store.dispatch--false')
}
const router = new VueRouter({
  routes
})

// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
// http://blog.csdn.net/qq673318522/article/details/55506650
router.beforeEach((to, from, next) => {
  let myuserInfo = {}
  myuserInfo = store.state.usersModule.userInfo
  console.log('7-' + myuserInfo.username)
  console.log('get more datea')
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.state.userInfo) {
      console.log('end')
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
    console.log('======record.meta.requiresAuth==========')
  } else {
    console.log('---not-matched-som requiresauth--')
    next()
  }
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  template: '<App/>',
  components: {
    App
  },
  router,
  store,
  methods: {
    checkLogin () {
      // 检查是否存在session
      console.log(this.getCookie('session'))
      if (!this.getCookie('session')) {
        console.log('not session')
        this.$router.push('/login')
      } else {
        this.$router.push('/HOME/')
      }
    }
  }
}).$mount('#app')
