<template>
  <div id="pm">
    <h1>Shopping---pm--- Cart Example</h1>
    <hr>
      <el-button type="primary" v-on:click="search" :loading="loadingBtn">Search</el-button>
  </div>
</template>

<script>
export default {
  name: 'pm',
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.detail = ''
      vm.getDetailData(vm)
    })
  },
  data () {
    return {
      activeIndex: '1',
      msg: 'home',
      loadingBtn: false,
      userInfo: {}
    }
  },
  methods: {
    async initData () {

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
