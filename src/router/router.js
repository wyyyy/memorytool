import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/store'
import * as types from '@/store/mutation-types'
import home from '@/components/home'
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const reg = r => require.ensure([], () => r(require('../page/login/reg')), 'reg')
const sc = r => require.ensure([], () => r(require('../page/sc/sc')), 'sc')
const tam = r => require.ensure([], () => r(require('../page/tam/index')), 'tam')
const pm = r => require.ensure([], () => r(require('../page/pm/index')), 'pm')
// const page = r => require.ensure([], () => r(require('@/components/page')), 'page')

Vue.use(VueRouter)

const routes = [{
  path: '',
  redirect: '/home'
},
{
  path: '/sc',
  name: 'TOCD',
  meta: {
    requireAuth: true
  },
  component: sc
},
{
  path: '/home',
  component: home
},
{
  path: '/login',
  component: login
},
{
  path: '/lo2gin',
  component: login,
  children: [{
    path: '/r4eg', // 订单详情页
    component: reg
  } ]
},
{
  path: '/tam',
  component: tam
},
{
  path: '/pm',
  component: pm
},
{
  path: '/page',
  component: pm
}
]
// 页面刷新时，重新赋值token
if (window.localStorage.getItem('userInfo')) {
  store.commit(types.SET_USER, window.localStorage.getItem('userInfo'))
}

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log('here')
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.usersModule.token) {
      console.log('we have token')
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default router
