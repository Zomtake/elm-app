import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import manage from '@/page/manage'

import addGoods from '@/page/manage/addGoods'
import addShop from '@/page/manage/addShop'
import adminList from '@/page/manage/adminList'
import goodsList from '@/page/manage/goodsList'
import home from '@/page/manage/home'
import orderList from '@/page/manage/orderList'
import shopList from '@/page/manage/shopList'
import userList from '@/page/manage/userList'
import editGoods from '@/page/manage/editGoods'

Vue.use(Router)

export default new Router({
  routes: [
   {
      path: '/',
//    name: 'manage',
      component: manage,
      children:[
      	 {
      	 	 path:"",
      	 	 name:"home",
      	 	 component:home
      	 },
      	  {
      	 	 path:"userList",
      	 	 name:"userList",
      	 	 component:userList,
      	 	 meta:["数据管理","用户列表"]
      	 },
      	  {
      	 	 path:"shopList",
      	 	 name:"shopList",
      	 	 component:shopList,
      	 	 meta:["数据管理","商家列表"]
      	 },
      	  {
      	 	 path:"orderList",
      	 	 name:"orderList",
      	 	 component:orderList,
      	 	 meta:["数据管理","订单列表"]
      	 },
      	  {
      	 	 path:"goodsList",
      	 	 name:"goodsList",
      	 	 component:goodsList,
      	 	  meta:["数据管理","商品列表"]
      	 },
      	  {
      	 	 path:"adminList",
      	 	 name:"adminList",
      	 	 component:adminList,
      	 	  meta:["数据管理","管理员列表"]
      	 },
      	  {
      	 	 path:"addShop",
      	 	 name:"addShop",
      	 	 component:addShop,
      	 	  meta:["添加数据","添加商家"]
      	 },
      	 {
      	 	 path:"editGoods",
      	 	 name:"editGoods",
      	 	 component:editGoods,
      	 	  meta:["食品列表","食品编辑"]
      	 },
      	  {
      	 	 path:"addGoods",
      	 	 name:"addGoods",
      	 	 component:addGoods,
      	 	  meta:["添加数据","添加商品"]
      	 }
      ]
   },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
