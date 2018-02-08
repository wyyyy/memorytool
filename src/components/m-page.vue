<template id="mPage">
  <div class="block">
    <h1>{{message}}</h1>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2,10, 20, 50, 60]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="mtotal">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'm-page',
  data: function () {
    return {
      message: 'i am page',
      mtotal: 7,
      loading: false
    }
  },
  watch: {
    pageSize: 'changeSize'
  },
  props: {
    rowClick: Function,
    tableData: Array,
    totalCount: Number,
    pageSizes: Array,
    checkBox: Boolean,
    description: String,
    tableHeight: Number,
    pageSize: Number,
    sortChange: Function
  },
  methods: {
    changeSize: function () {
      this._data.tpageSize = this.pageSize
    },
    selectionChange: function (val) {
      this.$emit('selectionChange', val)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      console.log(`每页 ${val} 条` + this.currentPage)
      this.$dispatch('btn-click', val)
      this.$emit('pageSizeChange', val)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.$emit('currentPageChange', val)
    }
  }
}
</script>
