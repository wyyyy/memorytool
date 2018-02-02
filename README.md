# memorytool

> tool for mermory db

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run server
supervisor server/server.js

# build for production and view the bundle analyzer report
npm run build --report
```


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
// 通过 header 发送 Authorization -> Bearer  + token
// 或者通过 ?access_token = token
http://cnodejs.org/topic/58c1477b06dbd608756d0bca

git clone https://github.com/Nicksapp/nAuth-restful-api.git
jsonwebtoken: 用来生成我们的token
passport: 非常流行的权限验证库
bcrypt: 对用户密码进行hash加密
基于Token的身份验证方法

客户端使用用户名和密码请求登录
服务端收到请求，验证登录是否成功
验证成功后，服务端会返回一个Token给客户端，反之，返回身份验证失败的信息
客户端收到Token后把Token用一种方式(cookie/localstorage/sessionstorage/其他)存储起来
客户端每次发起请求时都选哦将Token发给服务端
服务端收到请求后，验证Token的合法性，合法就返回客户端所需数据，反之，返回验证失败的信息

https://www.cnblogs.com/hlere/p/6668159.html?utm_source=itdadao&utm_medium=referral
https://github.com/Nicksapp/nAuth-restful-api
http://www.passportjs.org/docs/authenticate/
