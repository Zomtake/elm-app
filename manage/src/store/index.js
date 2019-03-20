//vue中用“状态仓库” 需要下载：npm i vuex -S
import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex)

var store = new Vuex.Store({
	state:{
		userName:""
	},
	mutations:{
		changeName(state,value){
			state.userName = value
		}
	}
})

export default store