<template lang="html">
  <div>
    <paginator :pageCount="pageCount" @togglePage="togglePage($event)"></paginator>
  </div>
</template>

<script>
import paginator from '@/components/paginator.vue'

export default {
  name: 'vendor',
  components: {
    'paginator': paginator
  },
  data () {
    return {
      // 总页数
      pageCount: 24
    }
  },
  methods: {
    togglePage (indexPage) {
      // 打印出当前页数
      console.log('current page is')
      console.log(indexPage)
    }
  }
}
</script>
