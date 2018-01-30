<template>
  <div>index page</div>
</template>

<script>
export default {
  created () {
    this.$api.get('topics', null, r => {
      console.log(r)
      console.log(r.data)
    })
  }
}
</script>
