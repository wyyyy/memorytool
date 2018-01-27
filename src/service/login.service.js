// login
import axios from 'axios'
import config from '../core/server.config'
var querystring = require('querystring')
export const accountLogin =
function accountLogin (user) {
  console.log('wzh2018')
  axios.post('/cms/login', querystring.stringify({ username: 'bar', password: '123' }), config)
    .then((response) => {
      // success
      console.log('res' + response.data)
    })
    .catch((error) => {
      // error
      console.log('eeor:' + error)
    })
}
