<template>
		<div class="shop">
		<div class="headbg"></div>
		<header>
			<div class="header-left">
				<img :src="shop.shopPhoto"/>
			</div>
			<div class="header-right">
				<h1>{{shop.shopName}}</h1>
				<span>商家配送／分钟送达／配送费¥{{shop.sendPrice}}</span>
				<p>公告:{{shop.info}}</p>
			</div>
		</header>
		
		<nav>
			<div class="nav_active">商品</div>
			<div>评价</div>
		</nav>
		
		<div class="main">
			<div class="left">
				<ul>
					<li 
						v-for="(item,index) in category"
						 :key="index"
						 :class="activeMenu == index?activeClass:''"
						 @click="select(index)"
						 >{{item}}</li>
				</ul>
			</div>
			<div class="right" id="right">
				<div v-for="(item,index) in goodsList" :key="index">
					<h2>{{item.title}}<span></span></h2>
					<div class="right_goods"  v-for="(option,idx) in item.list" :key="idx">
						<div class="photo">
						  <img :src="$store.state.imgAddress+option.photo"/>
						</div>
						<div class="content">
							<h3>{{option.foodName}}</h3>
							<span>月售283份 / 好评率98%</span>
							<div>
								<em>￥{{option.price}}</em>
								<div>
									<transition name="btn">
									    <div v-show="btnFlag[option.index]">
											<b class="btn_left" @click="reduceCount(option.index)">-</b>
											<input type="text" v-model="count[option.index]" />
										</div>
									</transition>
									<b class="btn_right" @click="addCount(option.index)">+</b>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
			<footer>
			<div class="foot-left" @click="popup()">
				<div class="car" :style="{background:isData?'#39f':''}">
					<img src="../../static/car.jpeg"/>
					<transition name="icon">
						<b class="icon" v-show="iconFlag">+</b>
					</transition>
				</div>
				<div class="content">
					<em>￥{{totalPrice}}</em>
					<span>配送费{{shop.sendPrice}}元</span>
				</div>
			</div>
			<div class="foot-right1" v-if="sendFlag" @click="jumpOrder()">
				去结算
			</div>
			<div class="foot-right" v-else>
				还差¥{{shop.startPrice - totalPrice}}起送
			</div>
			
		</footer>
		<mt-popup
		  v-model="popupVisible"
		  position="bottom">
		  <div class="popup">
		   	  <h2>
		   	  	<b>购物车</b>
		   	  	<span @click="clearAll()">清空</span>
		   	  </h2>
		   	  <div class="popup-list" v-for="(item,index) in shopCarList" :key="index">
		   	  	 <p>{{item.foodName}}</p>
		   	  	 <em>￥{{item.price}}</em>
		   	  	 <div>
		   	  	 	<b class="btn-left" @click="reduceCount(item.index)">-</b>
		   	  	 	<input type="text" v-model="count[item.index]" />
		   	  	 	<b class="btn-right" @click="addCount(item.index)">+</b>
		   	  	 </div>
		   	  </div>
		   </div>
		</mt-popup>
	</div>
</template>

<script>
export default {
	data(){
		return{
			shop:this.$route.params.shop,
			shopId:this.$route.params.shop._id,
			allGoods:[],
			category:[],
			goodsList:[],
			activeClass:"left_active",
			activeMenu:0,
			rightEl:"",
			htmlFontSize:"",
			scrollHeight:[],
			btnFlag:[],
			count:[],
			iconFlag:false,
			popupVisible:false,
			shopCarList:[]
		}
	},
	computed:{
		isData(){
			var total = false;
			this.count.forEach(item=>{
				if(item){
					total = true;
				}
			})
			if(total == false){
				this.popupVisible = false;
			}
			return total
		},
		totalPrice(){
			var total = 0;
			this.getShopCar();
			this.shopCarList.forEach(item=>{
				total += this.count[item.index] * item.price
			})
			return total
		},
		sendFlag(){
			var flag = false;
			if(this.totalPrice >= this.shop.startPrice){
				flag = true
			}
			return flag
		}
	},
	mounted(){
		this.rightEl = document.getElementById("right")
		this.htmlFontSize = document.documentElement.style.fontSize;
	},
	created(){
		this.getGoods()
	},
	methods:{
		async getGoods(){
			var res = await this.$http.get("/addGoods",{
				params:{shopId:this.shopId}
			})
			console.log(res)
			this.allGoods = res.data;
			//给每一个商品加一个索引
			this.allGoods.forEach((item,index)=>{
				item.index = index
			})
			this.allGoods.forEach(item=>{
				if(item.style && this.category.indexOf(item.style) == -1){
					this.category.push(item.style)
				}
			})
			this.allGoods.forEach(item=>{
				if(item.category && this.category.indexOf(item.category) == -1){
					this.category.push(item.category)
				}
			})
			
			//取分类中的产品
			var total = 0;
			this.category.forEach(item=>{
				var list = [];
				this.allGoods.forEach(options=>{
					if(options.style == item){
						list.push(options)
					}
					if(options.category == item){
						list.push(options)
					}
				})
	
				this.goodsList.push({
					title:item,
					list
				})
             	total+=2+list.length*4;
//           	console.log(total)
				this.scrollHeight.push(total)
			})	
			
	 },
		select(index){
			this.activeMenu = index;
    		console.log(this.htmlFontSize)
			this.rightEl.scrollTop = this.scrollHeight[index-1] * parseInt(this.htmlFontSize)
		},
		addCount(index){
			//清空前，备份一分
			var ary = JSON.parse(JSON.stringify(this.count))
			//如果不会自动更新，我们如果这个数据清空，就会更新
			this.count = []
			//清空结束后，又把数据再赋值回来
			this.count = ary;
			
			var ary = JSON.parse(JSON.stringify(this.btnFlag))
			this.btnFlag = []
			this.btnFlag = ary;
			this.btnFlag[index] = true;
			this.count[index] = this.count[index]==undefined?1:this.count[index]+1;
			this.iconFlag = true;
			setTimeout(()=>{
				this.iconFlag = false
			},500)
		},
		reduceCount(index){
			//清空前，备份一分
			var ary = JSON.parse(JSON.stringify(this.count))
			//如果不会自动更新，我们如果这个数据清空，就会更新
			this.count = []
			//清空结束后，又把数据再赋值回来
			this.count = ary;
			if (this.count[index]>0) {
				this.count[index] = this.count[index]-1
			}
			if (this.count[index]==0) {
				this.btnFlag[index] = false;
				this.getShopCar()
			}
		},
		popup(){
			if(this.isData){
				this.popupVisible = true;
				this.getShopCar()
			}
		},
		getShopCar(){
			this.shopCarList = []
			//要找到所有 购买量>0 的商品，组成一个新的数组
			this.allGoods.forEach(item=>{
				if (this.count[item.index]) {
					this.shopCarList.push(item)
				}
			})
		},
		clearAll(){
			this.count = [];
			this.shopCarList = [];
			this.btnFlag = [];
			this.popupVisible = false;
		},
		jumpOrder(){
			this.getShopCar();
			this.shopCarList.forEach(item=>{
				item.count = this.count[item.index]
			})
			var obj = {
				shop:this.shop,
				goodList:this.shopCarList
			}
			this.$store.commit("changeShopCar",obj)
			this.$router.push("/order")
		}
	}
}
</script>

<style>
.shop {background: #fff;}
.shop .headbg { height: 4rem; width: 100%; background: url(../../static/61001537857032.jpg) no-repeat center;
background-size: cover; -webkit-filter: blur(1px); position: fixed; top: 0; left: 0;}
.shop header {
	height: 4rem; position: fixed; top: 0; left: 0; display: flex;
}
.header-left {
	width: 25%;
	padding: .3rem;
}
.header-left img {
	width:100%; height: 100%;
}

.header-right {
	flex: 1; font-size: 0.7rem; color: #fff;
}
.header-right h1 {
	font-size: 1rem; line-height: 1.7rem;
}

.shop nav {
	height: 2.4rem; display: flex; justify-content: space-around;
	font-size: 0.8rem; align-items: center; border-bottom: 1px solid #ddd;
	position: fixed; top: 4rem; width: 100%;
}
.shop nav .nav_active {
	color: #409EFF; border-bottom: 2px solid #409EFF; padding-bottom: 0.2rem;
}
.main { display: flex; position: fixed; top: 6.4rem; width: 100%;}
.main .left {width: 25%;}
.main .right {flex: 1; height: 18rem; overflow: scroll;}
.main .left li { height: 2.6rem; line-height: 2.6rem; text-align: center; font-size: 0.7rem;
background: #efefef; border-bottom: 1px solid #e9e9e9; color: #333; }
.main .left .left_active {
	border-left: 3px solid #007AFF; background: #fff; 
}
.right h2 { background: #fafafa; height: 2rem; font-size: 0.7rem; line-height: 2rem; padding-left: 12px;}
.right h2 span { color: #555; font-size: 0.5rem; padding-left: 0.2rem;}


.right_goods { padding: 0 12px; height: 4rem; display: flex; align-items: center;}
.right_goods .photo  { width: 25%;}
.right_goods .photo img { width: 100%;}
.right_goods .content { flex: 1; padding-left: 10px; font-size: 0.7rem; }
.right_goods .content > div { display: flex; justify-content: space-between;}
.right_goods .content > div > div{ display: flex;}
.right_goods .content > div > div > div { display: flex;}
.right_goods .content > div > div input { width: 0.8rem; text-align: center; font-size: 0.7rem;}
.right_goods .content > div .btn_left {display: block; width: 1rem; height: 1rem; border:2px solid #007AFF; 
border-radius: 0.5rem; text-align: center; line-height: 1rem; font-size: 0.8rem; font-weight: bold;}

.right_goods .content > div .btn_right {display: block; width: 1rem; height: 1rem; background: #007AFF; color: #fff;
border-radius: 0.5rem; text-align: center; line-height: 1rem; font-size: 0.8rem; font-weight: bold;}

footer { z-index: 10000; display: flex; position: fixed; bottom: 0; left: 0; width: 100%; height: 2.4rem;
background: #333333; color: #fff; font-size: 0.7rem;}
footer .foot-left{ flex: 2;}
footer .foot-left .car { width: 3rem; height: 3rem; border: 0.15rem solid #444; 
border-radius: 1.5rem;text-align: center; line-height: 3rem; position: absolute; 
left: 1rem; top:-1rem;background: #333; display: flex; justify-content: center; align-items: center;}
footer .foot-left .car img { width: 45%;}
footer .foot-left .car .icon {
	display: block; width: 1rem; height: 1rem; background: #007AFF; color: #fff;
border-radius: 0.5rem; text-align: center; line-height: 1rem; font-size: 0.8rem; font-weight: bold;
   position: absolute; left: 30%; top: 10%;
  /* transform: translate(13rem,-10rem);*/
}
footer .foot-left .car { width: 3rem; height: 3rem; border: 0.15rem solid #444; border-radius: 1.5rem;
text-align: center; line-height: 3rem; position: absolute; left: 1rem; top:-1rem;background: #333;}
footer .foot-left .content { margin-left: 4.3rem;}
footer .foot-left .content em { display: block; line-height: 1.2rem; font-size: 0.8rem; font-style: normal;}
footer .foot-left .content span { font-size: 0.5rem;}
footer .foot-right1{ flex: 1;background: #3DAAC9; text-align: center; font-size: 0.9rem ; line-height: 2.4rem;}
footer .foot-right{ flex: 1;background: #555; text-align: center; line-height: 2.4rem;}
.btn-enter,.btn-leave-to{
	opacity: 0; transform: translateX(1rem);
}
.btn-enter-active,.btn-leave-active{
	transition: all .5s
}
.mint-popup-bottom { width: 100%; padding-bottom: 4rem;}

.popup h2 { background: #eee; display: flex; justify-content: space-between; 
height: 2rem; align-items: center; font-size: 0.7rem; padding: 0 0.5rem;}
.popup .popup-list { display: flex; font-size: 0.8rem;padding: 0 0.5rem; align-items: center;
height: 2rem;
 }
.popup .popup-list p { flex: 6;}
.popup .popup-list em { flex: 2; font-style: normal; color: #f30;}
.popup .popup-list div { flex: 2;}
.popup .popup-list > div { display: flex; justify-content: flex-end;}
.popup .popup-list > div input { width: 0.8rem; font-size: 0.7rem; text-align: center;}
.popup .popup-list > div b {display: block; width: 1rem; height: 1rem; 
border-radius: 0.5rem; text-align: center; 
line-height: 1rem; font-size: 0.8rem; 
font-weight: bold;}
.popup .popup-list > div .btn-left{
	border: 2px solid #007AFF;
}
.popup .popup-list > div .btn-right {
	background: #007AFF;color: #fff;
}
</style>