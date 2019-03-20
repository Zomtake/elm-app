<template>
    <div class="confirmOrderContainer">
        
            <mt-header title="确认订单" fixed>
			  <router-link :to="{name:'shop',params:{shop:$store.state.shopCar.shop}}" slot="left">
			    <mt-button icon="back"></mt-button>
			  </router-link>
			  
			  <router-link v-if="$store.state.userName" to="/user" slot="right">
			  	<mt-button>{{$store.state.userName}}</mt-button>
			  </router-link>
			  <router-link v-else to="/login" slot="right">
			  	<mt-button>登录</mt-button>
			  </router-link>
			</mt-header>
		<section>
            <a @click="goAddress()" class="address_container">
                <div class="address_empty_left">
                    <img src="../../static/position.png"/>
                   
                    <div v-if="choose" class="address_detail_container">
                        <header>
                            <span>{{choose.yourName}}</span>
                            <span>{{choose.sex}}</span>
                            <span>{{choose.phone}}</span>
                        </header>
                        <div class="address_detail">
                            <span>{{choose.tag}}</span>
                            <p>{{choose.address}}</p>
                        </div>
                    </div>
                     <div class="add_address" v-else>请添加一个收货地址</div>
                </div>
                 <img src="../../static/right.png"/>
            </a>
            <section class="delivery_model container_style">
                <p class="deliver_text">送达时间</p>
                <section class="deliver_time">
                    <p>尽快送达 | 预计 30分种</p>
                    <p v-if="7">蜂鸟专送</p>
                </section>
            </section>
            <section class="pay_way container_style">
                <header class="header_style">
                    <span>支付方式 </span>
                    <div class="more_type" @click="payMethod()">
                        <span>{{payValue}} > </span>
                    </div>
                </header>
                <section class="hongbo">
                    <span>红包</span>
                    <span>暂时只在饿了么 APP 中支持</span>
                </section>
            </section>
            <section class="food_list">
                <header>
                    <img :src="shop.shopPhoto">
                    <span>{{shop.shopName}}</span>
                </header>
                <ul class="food_list_ul" v-if="1">
                    <li v-for="(item,index) in goodsList" :key="index" class="food_item_style">
                        <p class="food_name ellipsis">{{item.foodName}}</p>
                        <div class="num_price">
                            <span>x {{item.count}}</span>
                            <span>¥{{item.price}}</span>
                        </div>
                    </li>
                </ul>
                <div class="food_item_style">
                    <p class="food_name ellipsis">餐盒</p>
                    <div class="num_price">
                        <span></span>
                        <span>¥ 1</span>
                    </div>
                </div>
                <div class="food_item_style">
                    <p class="food_name ellipsis">配送费</p>
                    <div class="num_price">
                        <span></span>
                        <span>¥ {{shop.sendPrice}}</span>
                    </div>
                </div>
                <div class="food_item_style total_price">
                    <p class="food_name ellipsis">订单 ¥{{orderPrice}}</p>
                    <div class="num_price">
                        <span>待支付 ¥{{orderPrice}}</span>
                    </div>
                </div>
            </section>
            <section class="pay_way container_style">
                <router-link to='/order/info' class="header_style">
                    <span>订单备注</span>
                    <div class="more_type">
                        <span class="ellipsis">{{info}} ></span>
                        
                    </div>
                </router-link>
                <router-link to="/" class="hongbo" :class="">
                    <span>发票抬头</span>
                    <span>
                        {{0}} >
                    </span>
                </router-link>
            </section>
            <section class="confrim_order">
                <p>待支付 ¥{{orderPrice}}</p>
                <p @click="confirm()">确认下单</p>
            </section>

        </section>
      
       
        <mt-popup
		  v-model="popupVisible"
		  position="bottom">
		  <div class="popup">
		   <mt-radio
		  	  @change="changeSelect"
		  	  align="right"
			  title="支付方式"
			  v-model="payValue"
			  :options="['货到付款', '微信支付', '支付宝']">
			</mt-radio>
		   </div>
		</mt-popup>
		 <transition name="aa" mode="out-in">
		 	<!--<keep-alive>-->
		 			<!--keep保持  alive 活着-->
			<!-- 一个子组件（子页面）移除时（页面已经切换了），
				保持活着：一直让（子页面）存在于内存中。再次加载时，
				效率会更高
			-->
		 	<router-view @info="msg"></router-view>
		 	<!--</keep-alive>-->
		 </transition>
    </div>
</template>


<script>
 export default {
	data(){
		return {
			popupVisible:false,
			shop:this.$store.state.shopCar.shop,
			goodsList:this.$store.state.shopCar.goodList,
			payValue:"支付宝",
			info:"口味,偏好等",
		}
	},
	computed:{
		choose(){
			return this.$store.state.ChooseAddress
		},
		isLogin(){
			return Boolean(this.$store.state.userName)
		},
		orderPrice(){
			var total = 0;
			this.goodsList.forEach(item=>{
			     total += item.price*item.count
			})
			console.log(total)
			total += 1 + Number(this.shop.sendPrice);
			console.log(total)
			return total
		},
		payText(){
			return this.payValue?this.payValue:"在线支付"
		}
	},
	methods:{
		payMethod(){
			this.popupVisible = true
		},
		changeSelect(val){
			this.popupVisible = false
		},
		msg(val){
			this.info=[],
			this.info = val.toString()
		},
		goAddress(){
			if (this.$store.state.userName) {
				this.$router.push("/order/chooseAddress")
			}else{
				this.$router.push("/login")
			}
		},
		async confirm(){
			//1验证登录地址
			if (!this.$store.state.userName) {
				this.$toast("请先登录")
				return false
			}
			if (!this.choose) {
				this.$toast("请先选择地址")
				return false
			}
			//2.订单信息收集
			var order = {
				address:this.choose,
				orderPrice:this.orderPrice,
				goodsList:this.goodsList,
				shop:this.shop,
				info:this.info,
				payMethod:this.payValue,
				userName:this.$store.state.userName
			}
			//3.发请求
			var res = await this.$http.post("/order",order)
			console.log(res)
			
			this.$router.push("/order/pay")
		}
	}
}
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
.aa-enter, .aa-leave-to {
	opacity: 0;
       transform: translateX(100%);
        
    }
    .aa-enter-active{
        transition: all .5s;
    }
     .aa-leave-active {
     	transition: all 0s;
     }
.popup h2 { background: #eee; display: flex; justify-content: center; 
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
    .confirmOrderContainer{
        padding-top: 1.95rem;
        padding-bottom: 3rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
         img {
            	width:8%;
            }
    }
    .container_style{
        background-color: #fff;
        margin-top: .4rem;
        padding: 0 .7rem;
    }
    .address_container{
        min-height: 3.5rem;
        @include fj;
        align-items: center;
        padding: 0 0.6rem;
       /* background: url(../../images/address_bottom.png) left bottom repeat-x;*/
        background-color: #fff;
        background-size: auto .12rem;
        .address_empty_left{
            display: flex;
            align-items: center;
            .location_icon{
                @include wh(.8rem, .8rem);
                fill: $blue;
                margin-right: .2rem;
            }
            .add_address{
                @include sc(.7rem, #333);
            }
            .address_detail_container{
                margin-left: .2rem;
                header{
                    @include sc(.65rem, #333);
                    span:nth-of-type(1){
                        font-size: .8rem;
                        font-weight: bold;
                    }
                }
                .address_detail{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    span{
                        @include sc(.5rem, #fff);
                        border-radius: .15rem;
                        background-color: #ff5722;
                        height: .6rem;
                        line-height: .6rem;
                        padding: 0 .2rem;
                        margin-right: .3rem;
                    }
                    p{
                        @include sc(.55rem, #777);
                    }
                }
            }
        }
    }
    .address_empty_right{
        @include wh(.6rem, .6rem);
        fill: #999;
    }
    .delivery_model{
        border-left: .2rem solid $blue;
        min-height: 4rem;
        @include fj;
        align-items: center;
        .deliver_text{
            @include sc(.8rem, #333);
            font-weight: bold;
            padding-left: .3rem;
        }
        .deliver_time{
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            p:nth-of-type(1){
                @include sc(.7rem, $blue);
            }
            p:nth-of-type(2){
                @include sc(.5rem, #fff);
                background-color: $blue;
                width: 2.4rem;
                margin-top: .5rem;
                text-align: center;
                border-radius: 0.12rem;
                padding: .1rem;
            }
        }
    }
    .pay_way{
        .header_style{
            @include fj;
            line-height: 2rem;
            span:nth-of-type(1){
                @include sc(.7rem, #666);
            }
            .more_type{
                span:nth-of-type(1){
                    @include sc(.6rem, #aaa);
                    width: 10rem;
                    display: inline-block;
                    text-align: right;
                    vertical-align: middle;
                }
                svg{
                    @include wh(.5rem, .5rem);
                    fill: #ccc;
                }
            }
        }
        .hongbo{
            @include fj;
            border-top: 0.025rem solid #f5f5f5;
            span{
                @include sc(.6rem, #aaa);
                line-height: 2rem;
                svg{
                    @include wh(.5rem, .5rem);
                    vertical-align: middle;
                    fill: #ccc;
                }
            }
            span:nth-of-type(2){
                color: #aaa;
            }
        }
        .support_is_available{
            span{
                color: #666;
            }
        }
    }
    .food_list{
        background-color: #fff;
        margin-top: .4rem;
        header{
            padding: .7rem;
            border-bottom: 0.025rem solid #f5f5f5;
            img{
                @include wh(1.2rem, 1.2rem);
                vertical-align: middle;
            }
            span{
                @include sc(.8rem, #333);
            }
        }
        .food_list_ul{
            padding-top: .5rem;
        }
        .food_item_style{
            @include fj;
            line-height: 1.8rem;
            padding: 0 .7rem;
            span,p{
                @include sc(.65rem, #666);
            }
            .food_name{
                width: 11rem;
            }
            .num_price{
                flex: 1;
                @include fj;
                align-items: center;
                span:nth-of-type(1){
                    color: #f60;
                }
            }
        }
        .total_price{
            border-top: 0.025rem solid #f5f5f5;
        }
    }
    .confrim_order{
        display: flex;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 2rem;
        p{
            line-height: 2rem;
            @include sc(.75rem, #fff);
        }
        p:nth-of-type(1){
            background-color: #3c3c3c;
            flex: 5;
            padding-left: .7rem;
        }
        p:nth-of-type(2){
            flex: 2;
            background-color: #56d176;
            text-align: center;
        }
    }
    .cover{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0,0,0,.3);
        z-index: 203;
    }
    .choose_type_Container{
        min-height: 10rem;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 204;
        header{
            background-color: #fafafa;
            @include sc(.7rem, #333);
            text-align: center;
            line-height: 2rem;
        }
        ul{
            li{
                @include fj;
                padding: 0 .7rem;
                line-height: 2.5rem;
                align-items: center;
                span{
                    @include sc(.7rem, #ccc);
                }
                svg{
                    @include wh(.8rem, .8rem);
                    fill: #eee;
                }
            }
            .choose{
                span{
                    color: #333;
                }
                svg{
                    fill: #4cd964;
                }
            }
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
    .slid_up-enter-active, .slid_up-leave-active {
        transition: all .3s;
    }
    .slid_up-enter, .slid_up-leave-active {
        transform: translate3d(0,10rem,0)
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
