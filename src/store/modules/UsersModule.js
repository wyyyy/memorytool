import * as types from '../mutation-types'
export default {
  state: {
    userInfo: {
      username: 'my',
      userid: '0'},
    isLogin: false,
    tocken: '',
    currentUser: {
      get UserName () {
        return localStorage.getItem('currentUserName')
      },
      get UserToken () {
        return localStorage.getItem('currentUserToken')
      }
    }
  },
  mutations: {
    mLogin (state) {
      state.isLogin = true
      let user = JSON.parse(sessionStorage.getItem('userInfo'))
      state.loginUser.UserName = user.UserName
      state.loginUser.userId = user.userId
    },
    mLogout (state) {
      state.isLogin = false
      state.loginUser.UserName = ''
      state.loginUser.userId = ''
    },
    [types.SET_USER] (state, { userinfo }) {
      state.userInfo = userinfo
    },
    setUserInfo (state, userInfo) {
      window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      state.userInfo = userInfo
      state.isLogin = true
      console.log('-setUserInfo.setuerinfo:' + userInfo)
    }
  },
  actions: {
    aLogin ({ commit }) {
      console.log('we execute the actions user-module-actions')
      commit('mLogin')
    },
    aLogout ({ commit }) {
      commit('mLogout')
    },
    userLogin ({ commit, state }, userInfo) {
      console.log('user-module-actions')
      console.log(userInfo)
      state.userInfo = userInfo.form
    }
  }
}
