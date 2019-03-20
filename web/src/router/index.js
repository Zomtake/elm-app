import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
import city from '@/page/city'
import msite from '@/page/msite'
import shop from '@/page/shop'
import order from '@/page/order'
import info from '@/page/order/info'
import addAddress from '@/page/order/addAddress'
import chooseAddress from '@/page/order/chooseAddress'
import pay from '@/page/order/pay'
import login from '@/page/login'
import user from '@/page/user'
import search from '@/page/search'
import orderList from '@/page/orderList'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/city',
      name: 'city',
      component: city
    },
    {
      path: '/msite',
      name: 'msite',
      component: msite
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop
    },
    {
      path: '/order',
      name: 'order',
      component: order,
      children:[
      {
      path: 'info',
      name: 'info',
      component: info

      },
      {
      path: 'addAddress',
      name: 'addAddress',
      component: addAddress

      },
      {
      path: 'chooseAddress',
      name: 'chooseAddress',
      component: chooseAddress

      },
      {
      path: 'pay',
      name: 'pay',
      component: pay
      }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: orderList
    }
  ]
})
