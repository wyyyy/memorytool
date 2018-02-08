<template>
  <div class="hello">
    <h1>Shopping---pm--- Cart Example</h1>
    <div class="search">
      <el-select v-model="value" placeholder="Pls Select">
        <el-option v-for="item in selectData" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker v-model="startDate" type="date" placeholder="Select Date">
      </el-date-picker>
      <el-button type="primary" v-on:click="subinfos('loginForm')" :loading="loadingBtn">Seapmrch</el-button>
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
              <el-form-item label="User ID">
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
        <el-table-column label="User ID" prop="id">
          <router-link :to="'/list/detail' + 'id'">
            <span>detail</span>
          </router-link>
        </el-table-column>
        <el-table-column label="Name" prop="name">
        </el-table-column>
        <el-table-column label="User Name" prop="username">
        </el-table-column>
        <el-table-column label="Phone" prop="phone">
        </el-table-column>
        <el-table-column label="Tel" prop="telephone">
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                       :page-sizes="[2,10, 20, 50, 60]" :page-size="pagesize"
                       layout="total, sizes, prev, pager, next, jumper" :total="ptotal">
        </el-pagination>
      </div>
    </div>
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
      ptotal: 1,
      currentPage: 1,
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
    }
  }
}
</script>

<style scoped>
</style>
