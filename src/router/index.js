import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const reg = r => require.ensure([], () => r(require('../page/login/reg')), 'reg')
const sc = r => require.ensure([], () => r(require('../page/sc/sc')), 'sc')
const page = r => require.ensure([], () => r(require('@/components/page')), 'page')

Vue.use(Router)

export default [{
  path: '',
  redirect: '/home'
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
  path: '/sc',
  component: sc
},
{
  path: '/page',
  component: page
}
]
