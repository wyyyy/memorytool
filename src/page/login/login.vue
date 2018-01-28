<template>
     <div class="hello">
    <el-form-item label="活动名称">Login</el-form-item>
   <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="UserName">
    <el-input v-model="form.username" placeholder="username"></el-input>
  </el-form-item>
   <el-form-item label="Password" prop="password">
    <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">SubmitLogin</el-button>
    <el-button>Cancel</el-button>
  </el-form-item>
</el-form>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      placestr: 'Pls input the username',
      form: {
        username: 'admin',
        password: 'admin'
      },
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
    onSubmit () {
      console.log('lgo login submit')
      console.log(this.form.username)
      let params = {
        loginName: this.form.username,
        loginPawd: this.form.password
      }
      this.$http.post('/users/login', params)
        .then(function (response) {
          console.log('/users/login')
          console.log(response)
          console.log(response.data)
          let expireDays = 1000 * 60 * 60 * 24 * 15
          this.setCookie('session', response.data.session, expireDays)
          this.$router.push('/user_info')
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
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
