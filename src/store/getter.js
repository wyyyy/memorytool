export default {
  loading: (state) => {
    return state.isShow
  },
  shownav: (state) => {
    return state.isNavShow
  },
  getUserInfo: (state) => {
    console.log('getuserifnofasd use')
    console.log(state.userInfo)
    console.log('getuserifnofasd use')
    return state.userInfo
  }
}
