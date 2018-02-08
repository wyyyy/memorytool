<template>
  <div class="page">
    <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                       :page-sizes="[2,10, 20, 50, 60]" :page-size="pagesize"
                       layout="total, sizes, prev, pager, next, jumper" :total="ptotal">
        </el-pagination>
      </div>
  </div>
</template>

<script>
export default {
  name: 'my-foot',
  data () {
    return {
      msg: 'home',
    }
  },
  props:{
          rowClick:Function,
          tableData:Array,    //表格数据s
          columns:Array,      //表格列配置数据,{vlaue:对应数据对象中的属性，label：对应的是标题文字，className：对应的是列的样式类名}
          totalCount:Number,  //表格数据总数
          pageSizes:Array,    //决定每页显示的条数[10,15,20,25]
          checkBox:Boolean,  //决定是否显示复选框
          description:String, //分页脚底左侧的数据说明
          tableHeight:Number,  //分页列表的高度
          pageSize:Number,
          sortChange:Function //用户点击列表头进行排序 { column, prop, order }

      },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
