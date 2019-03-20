<template>
	<div class="info">
		  <mt-header title="备注信息" fixed>
			  <router-link to="/order" slot="left">
			    <mt-button icon="back"></mt-button>
			  </router-link>
			</mt-header>
			
				<div class="info_list">
				<h2>快速备注</h2>
				<info-list @add="add" @reduce="reduce">
					<info-list-item v-for="(item,index) in list" :key="index" :data="item"></info-list-item>
				</info-list>
			</div>
			<div class="info_list">
				<h2>其他备注</h2>
				<textarea placeholder="请输入备注内容(可不填)" v-model="txt"></textarea>
			</div>
			
			<button class="btn" @click="confirm()">确定</button>
	</div>
</template>

<script>
import infoList from "./infoList";
import infoListItem from "./infoListItem";

export default {
	components:{infoList,infoListItem},
	data(){
		return {
			list:["不要辣","多点辣","不要香菜","不要洋葱","多点醋","多点葱","加冰"],
			checkList:[],
			txt:""
		}
	},
	methods:{
		add(val){
			this.checkList.push(val)
		},
		reduce(val){
			this.checkList.splice(this.checkList.indexOf(val),1)
		},
		confirm(){
			//alert(123)
		
			this.$emit("info",[this.checkList,this.txt])
			this.$router.push("/order")
		}
	}
}
</script>

<style>
.info {position: fixed; left: 0; top: 0; width: 100%;height: 100%;
background: #fff; z-index: 10000;}
.info_list{ margin-top: 1rem; border-top: 10px solid #eee;}
.info_list h2 { font-size:0.8rem; padding: 16px;}
.info_list textarea { margin:0 1rem; background: #eee;display: block;
 width:14rem; height: 7rem; font-size: 0.7rem; border-radius: 12px; padding: 10px; }
.info .btn {
	 border: none; width: 90%; margin: 0 auto; display: block;
	height: 1.8rem;  border-radius: 0.2rem; font-size: 0.7rem;
	background: #42B983; color: #fff; margin-top: 1rem;
}
</style>