<template>
  <div class="hello">
<transition name="form-fade" mode="in-out">
<section class="form_contianer" v-show="showLogin">
<div class="manage_tip">
<p>elm后台管理系统</p>
</div>
<el-form :model="loginForm" :rules="rules" ref="loginForm">
<el-form-item prop="username">
<el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
</el-form-item>
<el-form-item prop="password">
<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
</el-form-item>
<el-form-item>
<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
</el-form-item>
</el-form>
<p class="tip">温馨提示：</p>
<div class="form-group">
<el-button type="primary" @click="userLogin({loginForm})">Submit</el-button>
<el-button type="primary" @click="onSubmit">onSubmit</el-button>
</div>
<p class="tip">未登录过的新用户，自动注册</p>
<p class="tip">注册过的用户可凭账号密码登录</p>
</section>
</transition>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  created () {
    console.log('created+get')
  },
  mounted () {
    this.showLogin = true
  },
  data () {
    return {
      placestr: 'Pls input the username',
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      showLogin: true,
      userInfo: {},
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
    ...mapActions([
      'userLogin'
    ]

    ),
    async submitForm () {

    },
    onSubmit () {
      var _this = this
      let params = {
        loginName: this.loginForm.username,
        loginPawd: this.loginForm.password
      }
      this.$http
        .post('/users/login', params)
        .then(function (res) {
          if (res.status === 200) {
            console.log('res.status:' + res.status)
          }
          console.log(res.data)
          _this.userInfo = res.data
          console.log('oogin-'+ res.data)
          _this.$store.commit('setUserInfo', (_this.userInfo))
          let redirect = decodeURIComponent(_this.$route.query.redirect || '/')
          _this.$router.push({
            path: redirect
          })
        })
        .catch(function (error) {
          console.log(error)
        })
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
