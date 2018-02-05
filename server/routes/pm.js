var express = require('express')
var moment = require('moment')
var pm = express.Router()
pm.get('/list', (req, res) => {
  console.log('2018-wzh' + 'user')
  console.log('eeee:' + moment().format())
  res.json({userid: '125'})
})
pm.get('/list/detail', (req, res) => {
  console.log('eeee:' + moment().format())
})
module.exports = pm
