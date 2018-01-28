var express = require('express')
var moment = require('moment')
var sc = express.Router()
const mysql = require('mysql')
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'vhr'
})
// get homePage datasid,username,name,address,phone
const getHomeStr = `SELECT * FROM user`
sc.get('/list', (req, res) => {
  let mId = req.query.pageSize
  console.log(moment().format() + mId)
  getHomeDatas(getHomeStr, req, res)
})

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
