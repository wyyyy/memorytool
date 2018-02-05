import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from '@/router/router.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/store'
import api from './api/api'
import axios from './core/axiosHttp.js'
Vue.prototype.$api = api
Vue.use(ElementUI)
Vue.use(VueRouter)

Vue.prototype.$http = axios
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
