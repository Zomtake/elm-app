// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import store from './store'


import axios from "./http"
Vue.prototype.$http = axios

Vue.use(ElementUI);

Vue.config.productionTip = false


//路由守卫
//router路由上面有一个方法 beforeEach(): 在进入任意一个“页面”前，就会触发的事件
//它可以记录 路由的来源和去向（路由对象），并且可以控制 路由是否通过
//router.beforeEach((to,from,next)=>{
//	  //要先看一下有哪个“页面”需要验证
//	  console.log(to)
//	  if(to.path == "/"){
//	  	 //就看一下 “状态仓库”中，userName:"" 是不是有值，如果有值，就表明，已经登录
//	  	 if(store.state.userName){
//	  	 	  //有值，就放行
//	  	 	  next()
//	  	 }else{
//	  	 	  router.push("/login")
//	  	 }
//	  }else{
//	  	//其它面页可以直截通过
//	  	 next()
//	  }
//})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
