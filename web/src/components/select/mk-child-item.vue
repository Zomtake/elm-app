<template>
	<span @click="change()" :class="$parent.child==duo?bg:''">
		{{duo}}
	</span>
</template>

<script>
export default{
	props:["duo"],
	data(){
		return {
			bg:"bg"
		}
	},
	methods:{
		change(){
//			console.log(this.flag)
			this.$emit("duo",this.duo)
//			this.flag = !this.flag;
//			if(this.flag){
//				//this.flag = false;
//	          	this.$emit("duo",this.duo)
//	          }else{
//	          //	this.$route.go(0)
//	          	this.$emit("jian",this.duo)
//	          	
//	         }
			
		
		}
	}
}
</script>

<style>
.bg { background: #42B983;}
</style>