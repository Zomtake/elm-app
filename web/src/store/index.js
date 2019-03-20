import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

var store = new Vuex.Store({
	state:{
		imgAddress:"http://101.132.164.127:3000/",
		city:"",
		address:"",
		position:"",
		shopCar:null,
		userName:"",
		ChooseAddress:null
	},
	mutations:{
		changeCity(state,value){
			state.city = value
		},
		changeAddress(state,value){
			state.address = value
		},
		changePosition(state,value){
			state.position = value
		},
		changeShopCar(state,value){
			state.shopCar = value
		},
		changeUser(state,value){
			state.userName = value
		},
		changeChooseAddress(state,value){
			state.ChooseAddress = value
		}
	}
})

export default store