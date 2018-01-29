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
// http://blog.csdn.net/qq673318522/article/details/55506650
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
    console.log('======record.meta.requiresAuth==========')
  } else {
    console.log('nnnnnnnnnnnnnnnnnn')
    next()
  }
})
Vue.config.productionTip = false
// 设置cookie,增加到vue实例方便全局调用
// vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
// 当然，如果session保存到vuex的话除外
Vue.prototype.setCookie = (cName, value, expiredays) => {
  var exdate = new Date()
  console.log('set cooke')
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = cName + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}

// 获取cookie、
function getCookie (name) {
  var arr = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (arr === document.cookie.match(reg)) { return (arr[2]) } else { return null }
}
Vue.prototype.getCookie = getCookie

// 删除cookie
Vue.prototype.delCookie = (name) => {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null) { document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() }
}

/* eslint-disable no-new */
new Vue({
  template: '<App/>',
  components: {
    App
  },
  router,
  watch: {
    '$route': 'checkLogin'
  },
  created () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      // 检查是否存在session
      if (!this.getCookie('session')) {
        console.log('not session')
        this.$router.push('/sc')
      } else {
        this.$router.push('/sc/list')
      }
    }
  }
}).$mount('#app')
