import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import products from './modules/products'
import pmModule from './modules/pmModule'
import cart from './modules/cart'
import usersModule from './modules/usersModule'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    usersModule, products, cart, pmModule
  },
  actions
})
