<template>
  <div class="hello">
    I am header
  </div>
</template>

<script>
export default {
  name: 'my-header',
  data () {
    return {
      activeIndex: '1',
      msg: 'home',
      scource: 'SC-MAIN'
    }
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
