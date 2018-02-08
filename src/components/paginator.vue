<template lang="html">
  <div class="pagination">
    <ul>
      <li :class="{disabled: curPage == 1}" @click="prevPage" v-if="pageCount > 1">上一页</li>
      <li :class="{active: curPage == 1}" @click="page(1)">1</li>
      <li class="ellipsis" v-show="curPage > 5 && pageCount > 10">...</li>
      <li :class="{active: curPage == index+offset}" v-for="(item,index) in middlePages" :key="item.value" @click="page(index+offset)">{{index+offset}}</li>
      <li class="ellipsis" v-show="curPage < bigLimit && pageCount > 10">...</li>
      <li :class="{active: curPage == pageCount}" @click="page(pageCount)" v-if="pageCount > 1">{{pageCount}}</li>
      <li :class="{disabled: curPage == pageCount}" @click="nextPage" v-if="pageCount > 1">下一页</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['pageCount'],
  data () {
    return {
      curPage: 1
    }
  },
  computed: {
    middlePages () {
      if (this.pageCount <= 2) {
        return 0
      } else if (this.pageCount > 2 && this.pageCount <= 10) {
        return this.pageCount - 2
      } else {
        return this.curPage > 999 ? 5 : 8
      }
    },
    bigLimit () {
      return this.middlePages > 5 ? this.pageCount - 6 : this.pageCount - 3
    },
    offset () {
      if (this.curPage <= 5) {
        return 2
      } else if (this.curPage >= this.bigLimit) {
        return this.bigLimit - 2
      } else {
        return this.middlePages > 5 ? this.curPage - 3 : this.curPage - 2
      }
    }
  },
  methods: {
    page (indexPage) {
      this.$emit('togglePage', indexPage)
      this.curPage = indexPage
    },
    prevPage () {
      if (this.curPage !== 1) {
        this.page(this.curPage - 1)
      }
    },
    nextPage () {
      if (this.curPage !== this.pageCount) {
        this.page(this.curPage + 1)
      }
    }
  }
}
</script>
<style lang="css" scoped>
</style>
