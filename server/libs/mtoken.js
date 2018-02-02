var jwt = require('jsonwebtoken')
var content = {msg: 'today  is  a  good  day'} // 要生成token的主题信息
var secretOrPrivateKey = 'I am a goog man!' // 这是加密的key（密钥）
var token = jwt.sign(content, secretOrPrivateKey, {
  expiresIn: 60 * 60 * 24 // 24小时过期
})
console.log('token ：' + token)
/*
var token = rq.body.token || rq.query.token || rq.headers['x-access-token']
// 从body或query或者header中获取token
jwt.verify(token, secretOrPrivateKey, function (err, decode) {
  if (err) { //  时间失效的时候/ 伪造的token
    rs.json({err: err})
  } else {
    rq.decode = decode
    console.log(decode.msg) // today  is  a  good  day
    next()
  }
})
*/
/*
function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}
*/
