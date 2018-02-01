import * as types from './mutation-types'
export default {
  showLoading: ({ commit }) => {
    commit('showLoading')
  },
  hideLoading: ({ commit }) => {
    commit('hideLoading')
  },
  showNav: ({ commit }) => {
    commit('showNav')
  },
  hideNav: ({ commit }) => {
    commit('hideNav')
  },
  addToCart: ({ commit }, product) => {
    if (product.inventory > 0) {
      commit(types.ADD_TO_CART, {
        id: product.id
      })
    }
  },
  setUserInfo: ({ commit, userInfo }) => {
    console.log('js')
    console.log(userInfo)
    commit(types.SET_USER, userInfo)
  }
}
