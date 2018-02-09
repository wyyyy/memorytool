<template id="mPage">
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2,10, 20, 50, 60]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageCount">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'm-page',
  data: function () {
    return {
      message: 'i am page',
      loading: false
    }
  },
  watch: {
    pageSize: 'changeSize'
  },
  props: {
    currentPage: Number,
    rowClick: Function,
    tableData: Array,
    totalCount: Number,
    pageSizes: Array,
    checkBox: Boolean,
    description: String,
    tableHeight: Number,
    pageSize: Number,
    pageCount: Number,
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
      this.$emit('pageSizeChange', val)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.$emit('togglePage', val)
    }
  }
}
</script>
