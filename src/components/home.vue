<template>
  <div class="hello">
    <router-link :to="'/city/' + 2" class="guess_city">
                <span>{{msg}}</span>
     </router-link>
     <br><router-link :to="'/sc/'">
              <span>{{scource}}</span>
     </router-link>
     <br> <router-link :to="'/login/'">
                <span>Login</span>
     </router-link>
     <br> <router-link :to="'/tam/'">
                <span>tamtamtamtam</span>
     </router-link>
     <br>
     <router-link :to="'/pm/'">
                <span>P-----M</span>
     </router-link>
     <el-button type="primary" @click="onSubmit" v-if="Logined">Quite</el-button>
     <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">
<router-link :to="'/sc/'">
        <span>SC</span>
    </router-link>
  </el-menu-item>
  <el-submenu index="2">
    <template slot="title">我的工作台</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
  </el-submenu>
  <el-menu-item index="3">
  </el-menu-item>
</el-menu>
<myheader></myheader>
  </div>
</template>

<script>
import myheader from './my-header.vue'
export default {
  components: {myheader},
  name: 'home',
  data () {
    return {
      isLogin: false,
      activeIndex: '1',
      msg: 'home',
      userInfo: {},
      scource: 'SC-MAIN'
    }
  },
  computed: {
    Logined: function () {
      var _this = this
      let userInfo = {}
      console.log('------------computed--start----------------')
      console.log(_this.$store.state.usersModule.isLogin)
      console.log('wode-------------' + userInfo.userid)
      console.log('computed' + 'arry')
      var isLogin = _this.$store.state.usersModule.isLogin
      return isLogin
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    onSubmit () {}

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
