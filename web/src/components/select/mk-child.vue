<template>
	<div v-if="Array.isArray(option)">
		<!--<span >{{item}}</span>-->
		<mk-child-item v-for="(duo,index) in option" :key="index" :duo="duo" @duo="yy"></mk-child-item>
	</div>
	<span v-else @click="change()" :class="flag?bg:''">{{option}}</span>
</template>

<script>
import mkChildItem from "@/components/select/mk-child-item"	
export default {
	components:{mkChildItem},
	props:["option"],
	data(){
		return {
			bg:"bg",
			flag:false,
			child:"",
			yuan:""
		}
	},
	methods:{
		change(){
		
		this.flag = !this.flag;
          if(this.flag){
          
          	this.$parent.$emit("abc",this.option)
          }else{
          
          	this.$parent.$emit("bde",this.option)
          }
			
		},
		yy(val){
			
			this.child = val;
			
			this.$parent.$emit("abc",val)
			
		}
	}
}
</script>

<style scoped="scoped">
span { border:1px solid #42B983; padding: 0 10px;}
.bg { background: #42B983;}
</style>