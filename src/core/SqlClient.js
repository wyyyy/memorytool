
var CommonUtil = require('../core/CommonUtil')
var pool = require('../jdbc').pool

/**
 * jdbc model 客户端
 */
var SqlClient = function () {}
SqlClient.prototype = {

  // 根据id获取
  getById: function (obj, callback, selectWhat, join) {
    pool.getConnection(function (err, connection) {
      var sql = 'SELECT '
      if (selectWhat) sql += selectWhat
      else sql += ' A.*'
      sql += ' FROM ' + obj['tablename'] + ' AS A'

      if (join) sql += join
      sql += ' WHERE A.ID = ' + obj['id']

      console.log('##    sql: ' + sql)
      connection.query(sql, function (err, result) {
        if (err) {
		        	console.log(CommonUtil.toTimeString(Date) + '[getById error] - ', err.message)
		        	return
		        }
        if (result != null && result.length > 0) {
          obj = result[0]
          for (var name in obj) {
            if (obj.hasOwnProperty(name) && name != 'id') {
              if (obj[name] == 'null' || obj[name] == 'undefined' || obj[name] == null) obj[name] = ''
            }
          }
          callback(obj)
        } else {
          callback(null)
        }
	        })
      connection.release()
    })
  }

}
