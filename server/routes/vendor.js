var express = require('express')
var moment = require('moment')
var vendorDao = require('../dao/vendorDao')

var vendor = express.Router()
vendor.get('/all', (req, res, next) => {
  res.json({'msg': vendorDao.queryAll(req, res, next)})
  console.log(res)
  res.json({ 'msg': '服务器出错', 'status': res.statusCode })
})
vendor.get('/detail', (req, res) => {
  console.log('eeee:' + moment().format())
})
module.exports = vendor
