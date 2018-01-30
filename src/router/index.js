import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const reg = r => require.ensure([], () => r(require('../page/login/reg')), 'reg')
const sc = r => require.ensure([], () => r(require('../page/sc/sc')), 'sc')
const tam = r => require.ensure([], () => r(require('../page/tam/index')), 'tam')
const page = r => require.ensure([], () => r(require('@/components/page')), 'page')

Vue.use(Router)

export default [{
  path: '',
  redirect: '/home'
},
{
  path: '/sc',
  name: 'sc',
  meta: {
    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
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
  path: '/page',
  component: page
}
]
