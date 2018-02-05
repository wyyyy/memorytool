<template>
  <div class="hello">
    <form  role="form" method="post" onsubmit="return false">
      <fieldset>
        <legend></legend>
        <div class="panel panel-default">
          <div class="panel-heading">
            <p class="tc">请先登录</p>
          </div>
          <div class="panel-body">
            <div class="form-group">
              <div class="input-group">
                  <el-input v-model="form.username" placeholder="username"></el-input>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon">
                  <span class="glyphicon glyphicon-lock"></span>
                </span>
                <el-input type="password" v-model="form.password" auto-complete="off"></el-input>

              </div>
            </div>
            <div class="form-group">
              <el-button type="primary" @click="onSubmit">Submit</el-button>
            </div>

          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'login',
  created () {
    console.log('created+get')
  },
  data () {
    return {
      placestr: 'Pls input the username',
      form: {
        username: 'admin',
        password: 'admin'
      },
      userInfo: {userid: '0'},
      info: '',
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    async initData(){

    },
    onSubmit () {
      var _this = this
      let params = {
        loginName: this.form.username,
        loginPawd: this.form.password
      }
      this.$http
        .post('/users/login', params)
        .then(function (res) {
          if (res.status === 200) {
          }
          _this.userInfo = res.data
          window.sessionStorage.userInfo = JSON.stringify(_this.userInfo)
          _this.$store.dispatch('setUserInfo', JSON.stringify(_this.userInfo))
          let redirect = decodeURIComponent(_this.$route.query.redirect || '/')
          _this.$router.push({
            path: redirect
          })
          console.log('router from:' + redirect)
        })
        .catch(function (error) {
          console.log(error)
        })
      // this.info = accountLogin(this.form)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    reguser () {
      this.preventRepeat = false
      this.$router.push('/login/reg')
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
