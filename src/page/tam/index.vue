<template>
  <div class="hello">
    <h1>Shopping---tam-2-customename--projectname--- Cart Example</h1>
    <div class="search">
      <el-select v-model="value" placeholder="Pls Select CustomeName">
        <el-option v-for="item in selectData" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value" placeholder="Pls Select ProjectName">
        <el-option v-for="item in selectData" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" v-on:click="subinfos('mForm')" :loading="loadingBtn">Search</el-button>
    </div>
    <div>
      <el-table :data="tableData" border v-loading="loadingTb" style="width: 90%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="UserName">
                <span>{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item label="Platform">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="ID">
                <span>{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item label="username">
                <span>{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item label="username">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="Desc">
                <span>{{ props.row.userface }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="Platform" prop="id">
          <router-link :to="'/list/detail' + 'id'">
            <span>detail</span>
          </router-link>
        </el-table-column>
        <el-table-column label="ProjectStatus" prop="ProjectStatus">
        </el-table-column>
        <el-table-column label="mpn" prop="mpn">
        </el-table-column>
        <el-table-column label="CustomerName" prop="CustomerName">
        </el-table-column>
        <el-table-column label="CustomerProjectName" prop="CustomerProjectName">
        </el-table-column>
        <el-table-column label="CustomerProjectLevel" prop="CustomerProjectLevel">
        </el-table-column>
         <el-table-column label="TA Date" prop="taDate">
        </el-table-column>
         <el-table-column label="1st/2nd Source" prop="telephone">
        </el-table-column>
         <el-table-column label="ForecastVolume(K)" prop="ForecastVolume">
        </el-table-column>
      </el-table>
      <div class="block">
        <input type="text" v-model="name" />
       <m-Page  :pageCount="pageCount" @togglePage="togglePage($event)"></m-Page>
      </div>
       <p>{{msg}}{{currentPage}}</p>
       <div class="block">
        <input type="text" v-model="name" />
       <m-Table  :columns="columns" @togglePage="togglePage($event)"></m-Table>
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
        {label: 'username', value: 'Value'},
        {label: 'username', value: 'Value'},
        {label: 'username', value: 'Value'},
        {label: 'username2', value: 'Value2'}
      ],
      name: 'MYNAME',
      props: ['message'],
      tableData: [{
        date: '2017-01-24',
        id: '2017-01-24',
        name: 'name',
        address: 'Laddress'
      }],
      selectData: [
        {
          value: '选项1',
          label: '黄金糕'
        }],
      value: '',
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
</style>
