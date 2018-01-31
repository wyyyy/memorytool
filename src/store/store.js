import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import tamModule from './modules/tamModule'
import usersModule from './modules/usersModule'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    tamModule, usersModule
  },
  actions
})
