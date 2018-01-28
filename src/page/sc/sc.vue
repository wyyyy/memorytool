<template>
  <div class="hello">
    <div class="search">
 <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in selectData"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-date-picker
      v-model="startDate"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  <el-button type="primary" v-on:click="search" :loading="loadingBtn">Search</el-button>
    </div>
    <div>
    <el-table
    :data="tableData"
    border
    v-loading="loadingTb"
    style="width: 90%">
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
    <el-table-column
      label="User ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="Name"
      prop="name">
    </el-table-column>
    <el-table-column
      label="User Name"
      prop="username">
    </el-table-column>
    <el-table-column
      label="Phone"
      prop="phone">
    </el-table-column>
    <el-table-column
      label="Tel"
      prop="telephone">
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2,10, 20, 50, 60]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="0">
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
      selectData: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      currentPage: 0,
      pagesize: 2,
      currentPage3: 5,
      currentPage4: 4,
      tableData: [{
        id: '2017-01-24',
        name: 'name',
        username: 'nameZh',
        address: 'Laddress'
      }],
      loadingTb: false,
      loadingBtn: false
    }
  },
  methods: {
    search: function (event) {
      var _this = this
      _this.loadingBtn = true
      let params = {
        pageSize: this.pagesize,
        pageIndex: this.currentPage,
        loginP3awd: this.currentPage
      }
      console.log(params)
      this.$http.get('/sc/list', {params: params})
        .then(function (response) {
          console.log(response.data.length + 'response')
          console.log(_this.tableData = response.data)
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
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
