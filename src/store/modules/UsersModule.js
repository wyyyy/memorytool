import * as types from '../mutation-types'
export default {
  state: {
    userInfo: {
      username: 'my',
      userid: '0'},
    isLogin: false,
    token: '',
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
    setUser (state, {userInfo, userToken}) {
      localStorage.setItem('currentUserName', userInfo)
      localStorage.setItem('currentUserToken', userToken)
    },
    [types.SET_USER] (state, userInfo) {
      console.log('to-do')
      let temp = 'userInfo.token'
      console.log(typeof userInfo)
      state.userInfo = userInfo
      state.token = temp
      state.isLogin = true
      window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      window.sessionStorage.setItem('currentUserToken', temp)
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
      console.log('actios')
      state.userInfo = userInfo.form
    }
  }
}
