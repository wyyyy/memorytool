import axios from 'axios'
import store from '@/store/store'
import router from '@/router/router'
import { baseUrl } from '../config/env'
import * as types from '../store/mutation-types'
import qs from 'qs'

let axiosHttp = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  /* transformRequest: [function (data, header) {
    //自定义请求参数解析方式（如果必要的话）
    data = qs.stringify(data)
    console.log('transformRequest')
    console.log(data)
    return data
  }],
  */
  paramsSerializer: function (params) {
    /* 自定义链接参数解析方式（如果必要的话） */
  }
})
// axios 配置
axiosHttp.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

// http request 拦截器
axiosHttp.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`
    }
    if (config.method === 'post') {
      console.log('request 拦截器 ')
      config.data = qs.stringify(config.data)
      console.log(config.data)
    }
    return config
  },
  err => {
    return Promise.reject(err)
    // return Promise.resolve(err)// no need catch
  })

// http response 拦截器
axiosHttp.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT)
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    return Promise.reject(error.response.data)
  })

export default axiosHttp
