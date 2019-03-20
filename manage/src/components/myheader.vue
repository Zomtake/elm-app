<template>
	<div class="myheader">
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>

		<el-dropdown>
		  <span class="el-dropdown-link">
		      <img src="../assets/logo.png"/>
		  </span>
		  <el-dropdown-menu slot="dropdown">
		    <el-dropdown-item>{{$store.state.userName}}</el-dropdown-item>
		    <el-dropdown-item><span @click="logout()">退出</span></el-dropdown-item>
		  </el-dropdown-menu>
		</el-dropdown>
	</div>
</template>
<script>
export default {
	methods:{
		logout(){
			this.$store.commit("changeName","")
			this.$router.push("/login")
		}
	}
}
</script>
<style>
.el-dropdown-link { display: block; width: 40px; height: 50px; margin-top: 10px;}
.el-dropdown-link img { width: 100%; height: auto; border-radius: 20px;}
.myheader { display: flex; justify-content: space-between;align-items: center;}
</style>