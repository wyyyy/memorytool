 <template>
 <div class="block">
    <span class="demonstration">完整功能</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
  </template>
<script>
export default {
  name: 'page',
  data () {
    return { tableData: [{
      date: '2017-01-24',
      id: '2017-01-24',
      name: 'name',
      address: 'Laddress'
    }],
    loading: false
    }
  }
}
</script>
