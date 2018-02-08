// dao/tamDao.js
// 实现与MySQL交互
var $sql = require('./userSqlMapping')
var dbpool = require('../libs/db.pool')

// 向前台返回JSON方法的简单封装
/* var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
} */
module.exports = {
  queryAll: function (req, res, next) {
    // var param = req.query || req.params
    console.log($sql.tam.queryAll)
    console.log($sql.tam.queryAll)
    dbpool.queryAll($sql.tam.queryAll)
  }
}
