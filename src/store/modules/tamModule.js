import shop from '../../api/shop'
import * as types from '../mutation-types'
// initial state
const state = {
  all: [],
  userInfo: { }
}

// getters
const getters = {
  allProducts: state => state.all
}

// actions
const actions = {
  getAllProducts ({ commit }) {
    shop.getProducts(products => {
      commit(types.RECEIVE_PRODUCTS, { products })
    })
  },
  "ADD" : function(store , param){
    return new Promise(function(resolve, reject) {
        store.commit('ADD',param)
        resolve("ok");
    })
}
}

// mutations
const mutations = {

  [types.ADD_TO_CART] (state, { id }) {
    state.all.find(product => product.id === id).inventory--
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
