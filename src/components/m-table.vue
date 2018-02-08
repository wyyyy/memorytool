<template id="mTable">
  <div class="block">
    <h1>{{message}}</h1>
    <div>
      <el-table :data="tableData" border v-loading="loadingTb" style="width: 100%">
        <el-table-column
          v-for="column in columns"
          :fixed="column.fixed"
          :prop="column.value"
          :label="column.label"
          :key="column.value"
          :width="column.width"
          :sortable="column.sortable"
          :formatter="column.formatter"
          :class-name="column.className">
        </el-table-column>
      </el-table>
  </div>
  </div>
</template>
<script>
export default {
  name: 'm-table',
  data: function () {
    return {
      message: 'i am page',
      selectData: [
        {
          value: '选项1',
          label: '黄金糕'
        }],
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
