// sign with default (HMAC SHA256)
var jwt = require('jsonwebtoken')
// backdate a jwt 30 seconds
// sign asynchronously
jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, function (err, token) {
  console.log(token)
  console.log(err)
})
