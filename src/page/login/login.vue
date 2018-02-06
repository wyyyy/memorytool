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
<el-button type="primary" @click="submitForm({loginForm})">Submit</el-button>
</div>
<p class="tip">未登录过的新用户，自动注册</p>
<p class="tip">注册过的用户可凭账号密码登录</p>
</section>
</transition>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import {login} from '@/api/getData'
import * as types from '@/store/mutation-types'
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
    fecthData:async function (params) {
      console.log(params)
    },
    async submitForm (formName) {
      var _this = this
      let params = {
        loginName: this.loginForm.username,
        loginPsd: this.loginForm.password
      }
      const res = await login(params)
      console.log('res.state')
      console.log(res)
      console.log(res.data)
      if (res.status === 200) {
        console.log('res.status:---' + res.status)
      }
      _this.userInfo = res.data
      if (res.status === 1) {
        console.log(res.status)
        console.log('oogin-' + JSON.stringify(_this.userInfo))
        _this.$store.commit(types.SET_USER, _this.userInfo)
        let redirect = decodeURIComponent(_this.$route.query.redirect || '/')
        _this.$router.push({
          path: redirect
        })
      }
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
