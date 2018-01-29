var express = require('express')
var moment = require('moment')
var sc = express.Router()
var dbpool = require('../libs/db.pool')
var db = require('../libs/db')
/* db.query('select * from user', [], function (results, fields) {
  console.log(results)
  console.log(fields)
}) */
const getHomeStr = `SELECT * FROM user`
sc.get('/list', (req, res) => {
  console.log('router.o' + 'user')
  console.log('eeee:' + moment().format())
  getHomeDatas(getHomeStr, req, res)
})
sc.get('/list/detail', (req, res) => {
  console.log('eeee:' + moment().format())
  getHomeDatasDetail(getHomeStr, req, res)
})
function getHomeDatasDetail (strGetDetail, req, res) {
  strGetDetail = `SELECT * FROM user where id= `
  let uid = req.query.id
  strGetDetail = (getHomeStr + uid)
  dbpool.query(strGetDetail, (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).send('database err').end()
    } else {
      if (data.length === 0) {
        res.status(500).send('no datas').end()
      } else {
        res.send(data)
      }
    }
  })
}
function getHomeDatas (getHomeStr, req, res) {
  let params = {
    pageSize: req.query.pageSize,
    pageIndex: req.query.pageIndex,
    loginP3awd: req.query.pageIndex
  }
  let pageSize = req.query.pageSize
  let pageIndex = req.query.pageIndex
  getHomeStr = `SELECT * FROM user limit `
  getHomeStr = (getHomeStr + pageIndex + ',' + pageSize)
  // getHomeStr = `SELECT * FROM user limit 1, 3`
  console.log(getHomeStr + pageIndex + params)
  db.query(getHomeStr, (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).send('database err').end()
    } else {
      if (data.length === 0) {
        res.status(500).send('no datas').end()
      } else {
        res.send(data)
      }
    }
  })
}
module.exports = sc
