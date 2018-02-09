var express = require('express')
var moment = require('moment')
var tamDao = require('../dao/vendorDao')

var tam = express.Router()
tam.get('/all', (req, res, next) => {
  tamDao.queryAll(req, res, next)
})
tam.get('/detail', (req, res) => {
  console.log('eeee:' + moment().format())
})
module.exports = tam
