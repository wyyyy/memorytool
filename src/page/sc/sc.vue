<template>
  <div class="hello">
    <h1>Shopping---sc-3-platform-mpn--vendor--- Cart Example</h1>
    <h1>Density type Technology Nodes Sample Time eol() emmc firmware edition </h1>
    <h1>  Platform Config</h1>
    <div class="search">
      <el-select v-model="value" placeholder="Pls Select">
        <el-option v-for="item in selectData" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker v-model="startDate" type="date" placeholder="Select Date">
      </el-date-picker>
      <el-button type="primary" v-on:click="search" :loading="loadingBtn">Search</el-button>
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
export default {
  name: 'sc',
  component: {
    page: 'page'
  },
  data () {
    return {
      startDate: '',
      selectData: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      ptotal: 0,
      currentPage: 0,
      pagesize: 2,
      currentPage3: 5,
      currentPage4: 4,
      tableData: [
        {
          id: '2017-01-24',
          name: 'name',
          username: 'nameZh',
          address: 'Laddress'
        }
      ],
      loadingTb: false,
      loadingBtn: false
    }
  },
  methods: {
    initData: async function () {
    },
    changePage: function () {
      this.currentPage = 1
      this.ptotal = 0
      console.log('change total' + this.ptotal)
    },
    getUserAccount: function () {
      var _this = this
      console.log('sql1')
      console.log(_this)
      return this.$http.get('/sc/list')
    },
    getUserPermissions: function () {
      console.log('sql2')
      return this.$http.get('/sc/list')
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
        mpn: _this.currentPage,
        platform: _this.currentPage,
        loginP3awd: _this.currentPage
      }
      this.$http.all([this.getUserAccount(), this.getUserPermissions()]).then(
        this.$http.spread(function (acct, perms) {
          console.log('two sql')
        })
      )
      console.log(params)
      this.$http
        .get('/sc/list', {params: params})
        .then(function (response) {
          console.log(response.data.length + 'response')
          console.log((_this.tableData = response.data))
          _this.changePage()
        })
        .catch(function (error) {
          console.log('error:' + error)
        })
      _this.loadingBtn = false
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .demo-table-expand {
    font-size: 0
  }
</style>
