<template id="mTable">
  <div class="block">
    <div>
      <el-table :data="tableData" border  stripe style="width: 95%" @row-click="tableDbEdit">
         <el-table-column type="expand" >
        <template  slot-scope="{row}">
           <el-form label-position="left" inline class="m-table-expand">
              <el-form-item
              v-for="col in columns"
              :key="col.mvalue"
              :label="col.label"
              v-if="col.show">
            <span>{{row[col.mvalue]}}{{ col.label }}：{{ row[col.mvalue] }}</span>
          </el-form-item>
           </el-form>
        </template>
        </el-table-column>
        <el-table-column
          v-for="column in columns"
          :key="column.mvalue"
          :fixed="column.fixed"
          :prop="column.mvalue"
          :label="column.label"
          :width="column.width"
          :sortable="column.sortable"
          :formatter="column.formatter"
          :class-name="column.className"  >
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
      message: 'i am table m-table',
      loading: false
    }
  },
  watch: {
    pageSize: 'changeSize'
  },
  computed: {
  },
  props: {
    currentPage: Number,
    rowClick: Function,
    tableData: Array,
    columns: Array, // {vlaue:对应数据对象中的属性，label：对应的是标题文字，className：对应的是列的样式类名}
    columnsprop: Array,
    columns2: Array,
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
    tableDbEdit (row, column, cell, event) {
      console.log('table')
      console.log(row, column, cell, event)
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    selectionChange: function (val) {
      this.$emit('selectionChange', val)
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
    color: #f05c1;
  }
  .m-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
