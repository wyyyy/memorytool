var express = require('express')
var router = express.Router()
const mysql = require('mysql')
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'vhr'
})
/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('router.o')
  var user = req.session.user
  console.log('router.o' + user)
  res.render('index', { title: 'Express' })
})
router.get('/login', function (req, res, next) {
  var user = req.session.user
  console.log('router.o' + user)
  next()
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
      if (data.length === 0) {
        res.status(500).send('no datas').end()
      } else {
        res.send(data)
      }
    }
  })
}
module.exports = router
