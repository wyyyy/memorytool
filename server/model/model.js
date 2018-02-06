// 用户信息
User = function () {
  this.tablename = 'user' // 用户表
  this.id = null // ID
  this.username = '' // 登录名
  this.displayname = '' // 显示姓名
  this.status = 0 // 状态(0.禁用,1.启用)
  this.createtime = '' // 创建日期
  this.lastlogintime = '' // 最后登录日期
}
module.exports = User
