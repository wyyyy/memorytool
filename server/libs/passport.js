// const passport = require('passport')
const Strategy = require('passport-http-bearer').Strategy
// 主要验证发送的token值与用户服务器端token值是否匹配，进行信息验证
const User = require('./models/user')
// const config = require('./config')

module.exports = function (passport) {
  passport.use(new Strategy(
    function (token, done) {
      User.findOne({
        token: token
      }, function (err, user) {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false)
        }
        return done(null, user)
      })
    }
  ))
}
