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
          reject(err)
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

  if (window.fetch && method === 'fetch') {
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/users/login',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      cache: 'force-cache'
    }

    if (type === 'POST') {
      console.log('fectch-post')
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }

    try {
      const response = await fetch(url, requestConfig)
      const responseJson = await response.json()
      return responseJson
    } catch (error) {
      throw new Error(error)
    }
  } else {
    return new Promise((resolve, reject) => {
      console.log('window.fetch')
      if (method === 'fetch') {
        console.log('1*' + method)
      } else {
        console.log('2' + method)
      }
      let requestObj
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest()
      }
      let sendData = ''
      if (type === 'POST') {
        sendData = JSON.stringify(data)
      }

      requestObj.open(type, url, true)
      requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      requestObj.send(sendData)

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState === 4) {
          if (requestObj.status === 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj)
            }
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}
