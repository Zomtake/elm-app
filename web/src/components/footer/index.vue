<template>
	<div class="footer">
		<div @click="$router.push('/msite')">
			<div>
				<img v-if="active=='/msite'" src="../../assets/myui/ic_tab_home_active.png"/>
				<img v-else src="../../assets/myui/ic_tab_home_normal.png"/>
			</div>
			<p :style="{color:active=='/msite'?'#42b983':'#000'}">外卖</p>
		</div>
		<div @click="$router.push('/search')">
			<div>
				<img v-if="active=='/search'" src="../../assets/myui/ic_tab_subject_active.png" />
				<img v-else src="../../assets/myui/ic_tab_subject_normal.png"/>
			</div>
			<p :style="{color:active=='/search'?'#42b983':'#000'}">搜索</p>
		</div>
		<div @click="$router.push('/orderList')">
			<div>
				<img v-if="active=='/orderList'" src="../../assets/myui/ic_tab_status_active.png"/>
				<img v-else src="../../assets/myui/ic_tab_status_normal.png"/>
			</div>
			<p :style="{color:active=='/orderList'?'#42b983':'#000'}">订单</p>
		</div>
		<div @click="$router.push('/user')">
			<div>
				<img  v-if="active=='/user'" src="../../assets/myui/ic_tab_profile_active.png"/>
				<img v-else src="../../assets/myui/ic_tab_profile_normal.png"/>
			</div>
			<p :style="{color:active=='/user'?'#42b983':'#000'}">我的</p>
		</div>
	</div>
</template>
<script type="text/javascript">
export default{
	props:["active"]
}
</script>
<style>
.footer {
	position:fixed; bottom: 0; left: 0;  
	height:2.4rem;width: 100%; font-size: 0.6rem;
	background: #fafafa; border-top:1px solid #ddd;
	display: flex; justify-content: space-around;
}
.footer > div { flex: 1; display: flex; flex-direction: column;align-items: center;}
.footer > div > div { width: 40%; position: relative; height: 1.7rem;}
.footer > div > div img {width: 100%; height: auto; position: absolute; left: 0; top: 0;}
</style> 