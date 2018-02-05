import shop from '../../api/shop'
import api from '../../fetch/api'
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
  getDetail ({ commit }, palyload) {
    console.log('store-get-deatil')
    api.PmList(palyload.id)
      .then(res => {
        commit(types.GET_SPORTS_DETAIL, res)
      })
  },
  getAllProducts ({ commit }) {
    shop.getProducts(products => {
      commit(types.RECEIVE_PRODUCTS, { products })
    })
  },
  'ADD': function (store, param) {
    return new Promise(function (resolve, reject) {
      store.commit('ADD', param)
      resolve('ok')
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
