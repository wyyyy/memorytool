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
    setUser (state, {userInfo, userToken}) {
      localStorage.setItem('currentUserName', userInfo)
      localStorage.setItem('currentUserToken', userToken)
    },
    setUserInfo (state, {userInfo}) {
      console.log('setuerinfo-tore-2018')
      console.log(userInfo)
      console.log(typeof userInfo)
      console.log('-----end--------')
      state.userInfo = userInfo
      state.tocken = userInfo.tocken
      state.isLogin = true
      window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      console.log('-setUserInfo.setuerinfo:' + userInfo)
      window.sessionStorage.setItem('currentUserToken', state.tocken)
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
