import { baseUrl } from './env'
import axiosHttp from '@/core/axiosHttp'

export default async (url = '', data = {}, type = 'GET', method = 'fetch') => {
  type = type.toUpperCase()
  url = baseUrl + url
  let params = data
  console.log(url)
  if (type === 'GET') {
    let dataStr = '' // 数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
  }
  if (type === 'GET') {
    return new Promise((resolve, reject) => {
      axiosHttp.get(url, {
        params: params
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          console.log(err)
          // reject(err)
        })
    })
  } else if (type === 'POST') {
    return new Promise((resolve, reject) => {
      axiosHttp.post(url, data)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
    })
  }
}
