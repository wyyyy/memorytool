var express = require('express')
var moment = require('moment')
var db = require('../libs/db')
var pm = express.Router()
const getHomeStr = `SELECT * FROM user`
pm.get('/list/all', (req, res) => {
  console.log('2018-wzh' + 'user' + moment().format())
  // res.json({count: '125'})
  console.log(req)
  GetDataCount(getHomeStr, req, res)
})
pm.get('/list/detail', (req, res) => {
  console.log('eeee:' + moment().format())
  getHomeDatas(getHomeStr, req, res)
})
function GetDataCount (getHomeStr, req, res) {
  let params = {
    accessToken: req.query.accessToken,
    pageSize: req.query.pageSize,
    pageIndex: req.query.pageIndex,
    loginP3awd: req.query.pageIndex
  }
  console.log('get token' + params)
  getHomeStr = `SELECT * FROM user  `
  // getHomeStr = (getHomeStr + pageIndex + ',' + pageSize)
  // getHomeStr = `SELECT * FROM user limit 1, 3`
  console.log(getHomeStr)
  db.query(getHomeStr, (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).send('database err').end()
    } else {
      if (data.length === 0) {
        res.status(500).send('no datas').end()
      } else {
        // res.send(data)
        res.json({count: 3}).end()
      }
    }
  })
}
function getHomeDatas (getHomeStr, req, res) {
  let params = {
    accessToken: req.query.accessToken,
    pageSize: req.query.pageSize,
    pageIndex: req.query.pageIndex,
    loginP3awd: req.query.pageIndex
  }
  console.log('get token')
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
module.exports = pm
