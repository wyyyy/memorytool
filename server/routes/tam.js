var express = require('express')
var moment = require('moment')
var db = require('../libs/db')
var tamDao = require('../dao/tamDao')

var tam = express.Router()
const getHomeStr = `SELECT * FROM user`
tam.get('/all', (req, res, next) => {
  console.log('2018-tam' + 'user' + moment().format())
  // res.json({count: '125'})
  console.log(req)
  tamDao.queryAll(req, res, next)
})
tam.get('/detail', (req, res) => {
  console.log('eeee:' + moment().format())
})
module.exports = tam
