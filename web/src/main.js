// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import store from './store'
import router from './router'
Vue.use(MintUI)
Vue.config.productionTip = false

import myFooter from "./components/footer"
Vue.component("my-footer",myFooter)
import axios from "axios"
axios.defaults.baseURL = "http://101.132.164.127:3000"
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
