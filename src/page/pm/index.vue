<template>
  <div id="pm">
    <h1>Shopping---pm--- Cart Example</h1>
    <hr>
      <el-button type="primary" v-on:click="search" :loading="loadingBtn">Search</el-button>
      <el-button type="primary" v-on:click="subinfos('loginForm')" :loading="loadingBtn">subinfos</el-button>
  </div>
</template>

<script>
import {getAllProducts, getProductsDetail} from '@/api/pm'
export default {
  name: 'pm',
  beforeRouteEnter (to, from, next) {
    next((vm) => {
    })
  },
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      ptotal: 0,
      currentPage: 0,
      pagesize: 2,
      currentPage3: 5,
      currentPage4: 4,
      activeIndex: '1',
      msg: 'home',
      accessToken: 'token',
      loadingBtn: false,
      userInfo: {}
    }
  },
  methods: {
    async content (formName) {
      var _this = this
      let params = {
        accessToken: _this.accessToken,
        pageSize: _this.pagesize,
        pageIndex: _this.currentPage,
        mpn: _this.currentPage,
        platform: _this.currentPage,
        loginP3awd: _this.currentPage
      }
      return getProductsDetail(params)
    },
    async page () {
      var _this = this
      let params = {
        accessToken: _this.accessToken,
        pageSize: _this.pagesize,
        pageIndex: _this.currentPage,
        mpn: _this.currentPage,
        platform: _this.currentPage,
        loginP3awd: _this.currentPage
      }
      return getAllProducts(params)
    },
    async subinfos (formName) {
      Promise.all([this.content(), this.page()]).then(function (values) {
        console.log('values')
        console.log(values)
      })
    },
    async submitForm (formName) {
      const res = await getAllProducts({user_name: this.loginForm.username, password: this.loginForm.password})
      console.log('res.state')
      console.log(res)
    },
    getDetailData (el) {
      let id = el.$route.params.id
      let router = this.$route.path.split('/')[1]
      let params = {
        id,
        router
      }
      el.$store.dispatch('getDetail', params)
      if (router === 'travel') {
        el.$store.dispatch('travelClicks', id)
      }
    },
    search: function (event) {
      var _this = this
      _this.loadingBtn = true
      let accessToken = _this.$store.state.usersModule.token
      console.log(accessToken)
      let params = {
        accessToken: accessToken,
        pageSize: _this.pagesize,
        pageIndex: _this.currentPage,
        loginP3awd: _this.currentPage
      }
      this.$http.all([this.getUserAccount(), this.getUserPermissions()])
        .then(this.$http.spread(function (acct, perms) {
          //
          console.log('two sql')
        }))
      console.log(params)
      this.$http.get('/sc/list', {params: params})
        .then(function (response) {
          console.log(response.data.length + 'response')
          console.log(_this.tableData = response.data)
          _this.changePage()
        })
        .catch(function (error) {
          console.log('error:' + error)
        })
      _this.loadingBtn = false
    }
  }
}
</script>
<style scoped>
</style>
