<template>
  <div class="hello">
   <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="UserName">
    <el-input v-model="form.username"></el-input>
  </el-form-item>
   <el-form-item label="Password" prop="psd">
    <el-input type="password" v-model="form.psd" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">Reg</el-button>
    <el-button>Cancel</el-button>
  </el-form-item>
</el-form>
  </div>
</template>
<script>
export default {
  name: 'reg',
  data () {
    return {
      form: {
        username: '',
        psd: '',
        desc: ''
      },
      rules: {
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onSubmit (formName) {
      console.log('submit!')
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
