<template>
  <div class="hello">
    <h1>Shopping---tam-2-customename--projectname--- Cart Example</h1>
    <div class="search">
      <el-button type="primary" v-on:click="subinfos('mForm')" :loading="loadingBtn">Search</el-button>
    </div>
    <div>
      <div class="block">
       <m-Page  :pageCount="pageCount" @togglePage="togglePage($event)"></m-Page>
      </div>
       <p>{{msg}}{{currentPage}}</p>
       <div class="block">
       <m-Table :columns="columns"
                :tableData="tableData"
                @togglePage="togglePage($event)">
       </m-Table>
      </div>
    </div>
  </div>

</template>

<script>
import {getAllTam, getTamDetail} from '@/api/pm'
import mPage from '@/components/m-page.vue'
import mTable from '@/components/m-table.vue'
export default {
  name: 'tam',
  components: {
    'm-Page': mPage,
    'm-Table': mTable
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
    })
  },
  data () {
    return {
      mForm: {
        username: '',
        password: ''
      },
      columns: [
        {label: 'mpn', mvalue: 'date', show: true},
        {label: 'platform', mvalue: 'id', show: true},
        {label: 'tam', mvalue: 'name', show: true, className: 'm-table-expand label'},
        {label: 'customer', mvalue: 'address', show: false}
      ],
      columnsprop: [
        {label: 'Header-mpn', mvalue: 'pname'},
        {label: 'Header-platform', mvalue: 'pdate'},
        {label: 'Header-customer', mvalue: 'pmpn'}
      ],
      tableData: [{
        date: '2017-01-24',
        id: 'tamid-woshiwalue',
        name: 'value-name',
        address: 'value-name',
        pname: 'value-name',
        pdate: 'value-name',
        pmpn: 'value-Laddress'
      },
      {
        date: '2017-01-25',
        id: 'id-woshiwalue2',
        name: 'value-name2',
        address: 'value-name2',
        pname: 'value-name2',
        pdate: 'value-name2',
        pmpn: 'value-Laddress2'
      }],
      selectData: [
        {
          value: '选项1',
          label: '黄金糕'
        }],
      pageCount: 8,
      CustomeName: '',
      ProjectName: '',
      ptotal: 1,
      currentPage: 1,
      pagesize: 2,
      currentPage3: 5,
      activeIndex: '1',
      msg: 'home',
      accessToken: 'token',
      loadingBtn: false,
      loadingTb: false,
      userInfo: {}
    }
  },
  methods: {
    togglePage (indexPage) {
      // 打印出当前页数
      console.log('current page is')
      console.log(indexPage)
      this.currentPage = indexPage
    },
    listen: function (data) {
      console.log('listen')
      this.msg = 'current page' + data
    },
    async content (formName) {
      var _this = this
      let params = {
        accessToken: _this.accessToken,
        pageSize: _this.pagesize,
        pageIndex: _this.currentPage,
        CustomeName: _this.CustomeName,
        ProjectName: _this.ProjectName,
        loginP3awd: _this.currentPage
      }
      return getTamDetail(params)
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
      return getAllTam(params)
    },
    async subinfos (formName) {
      var _this = this
      _this.loadingBtn = true
      Promise.all([this.page(), this.content()]).then(function (values) {
        console.log('val4ues')
        console.log(typeof values[0].count)
        _this.ptotal = values[0].count
        console.log(values[1])
      })
      _this.loadingBtn = false
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
    }
  }
}
</script>

<style scoped>
 .m-table-expand {
    font-size: 0;
  }
  .m-table-expand label {
    width: 90px;
    color: #f05c18;
  }
  .m-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
