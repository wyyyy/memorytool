<template>
  <div class="hello">
    I am foot
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
