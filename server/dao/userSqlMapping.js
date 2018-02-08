// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
  insert: 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
  update: 'update user set name=?, age=? where id=?',
  delete: 'delete from user where id=?',
  queryById: 'select * from user where id=?',
  queryAll: 'select * from user'
}

var tam = {
  insert: 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
  update: 'update user set name=?, age=? where id=?',
  delete: 'delete from user where id=?',
  queryById: 'select * from user where id=?',
  queryAll: 'select * from tam'
}

// 模块导出
module.exports = {
  user: user,
  tam: tam,
  EXECUTE: tam
}
