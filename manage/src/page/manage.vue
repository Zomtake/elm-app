<template>
		<el-container>
		   <el-aside width="200px">
		   		<el-menu 
		   		  default-active="/"
			      class="el-menu-vertical-demo"
			      background-color="#324157"
			      text-color="#fff"
			      active-text-color="#20a0ff"
			      router>
			      <!--menu是则栏，放项目的，
			      	1.可以展开的项，对应的组件是 ： el-submenu
			      	2.固定的项,，对应的组件是 ：el-menu-item
			      -->
			      <el-menu-item index="/">
			         <i class="el-icon-menu"></i>
			         <span slot="title">首页</span>
			      </el-menu-item>
			      <el-submenu index="3">
			      	  <!--template是标题-->
			      	  <template slot="title">
			            <i class="el-icon-document"></i>
			            <span>数据管理</span>
			          </template>
			          <!--每一项，用的还是el-menu-item-->
			          <el-menu-item index="/userList"><span slot="title">用户列表</span></el-menu-item>
			          <el-menu-item index="/shopList"><span slot="title">商家列表</span></el-menu-item>
			          <el-menu-item index="/orderList"><span slot="title">订单列表</span></el-menu-item>
			          <el-menu-item index="/goodsList"><span slot="title">食品列表</span></el-menu-item>
			          <el-menu-item index="/adminList"><span slot="title">管理员列表</span></el-menu-item>
			      </el-submenu>
			      
			      <el-submenu index="4">
			      	  <!--template是标题-->
			      	  <template slot="title">
			            <i class="el-icon-document"></i>
			            <span>添加数据</span>
			          </template>
			          <!--每一项，用的还是el-menu-item-->
			          <el-menu-item index="/addShop"><span slot="title">添加商铺</span></el-menu-item>
			          <el-menu-item index="/addGoods"><span slot="title">添加商品</span></el-menu-item>
			      </el-submenu>
			    </el-menu>
		   	
		   </el-aside>
		   <el-container>
		     <el-header>
		     	<my-header></my-header>
		     </el-header>
		     <el-main>
		     	 <!--用来显示子路由的路由视图-->
		     	 <router-view></router-view>
		     </el-main>
		  </el-container>
		</el-container>
</template>

<script>
import myHeader from "@/components/myheader"
export default {
	components:{myHeader},
	methods:{
		logout(){
			this.$store.commit("changeName","")
			this.$router.push("/login")
		}
	}
}
</script>

<style>
.el-container { height: 100%;}

 .el-header, .el-footer {
    background-color: #eff2f7;
    color: #333;
  /*  text-align: center;*/
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #324157;
    color: #333;
   /* text-align: center;*/
    line-height: 200px;
  }
  
  .el-main {
  /*  background-color: #E9EEF3;*/
    color: #333;
   /* text-align: center;*/
   /* line-height: 160px;*/
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>