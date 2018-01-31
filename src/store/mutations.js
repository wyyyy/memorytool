import getters from './getter.js'
const state = {
  isShow: true,
  token: null,
  isNavShow: true,
  userInfo: {}
}
const mutations = {
  showLoading: (state) => {
    state.isShow = true
  },
  hideLoading: (state) => {
    state.isShow = false
  },
  showNav: (state) => {
    state.isNavShow = true
  },
  hideNav: (state) => {
    state.isNavShow = false
  },
  setUserInfo: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

export default {
  getters,
  state,
  mutations
}
/*
改变state的数值的方法，写在mutations 同步
Vuex提供了commit方法来修改状态
*/
