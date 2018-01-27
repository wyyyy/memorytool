var express = require('express')
var router = express.Router()
const mysql = require('mysql')
const common = require('../libs/common')
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'node_cms'
})
/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('router.o')
  res.render('index', { title: 'Express' })
})
// get homePage datas
const getHomeStr = `SELECT * FROM user`
router.get('/home', (req, res) => {
  getHomeDatas(getHomeStr, res)
})

function getHomeDatas (getHomeStr, res) {
  db.query(getHomeStr, (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).send('database err').end()
    } else {
      if (data.length == 0) {
        res.status(500).send('no datas').end()
      } else {
        res.send(data)
      }
    }
  })
}
module.exports = router
