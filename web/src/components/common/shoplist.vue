<template>
	<div class="shoplist_container">
		<!-- :bottom-method="loadBottom"-->
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
		<ul>
			<router-link :to="{name:'shop',params:{shop:item}}" v-for="(item,index) in shopList" :key="index"  class="shop_li">
				<section>
					<img :src="item.shopPhoto" class="shop_img">
				</section>
				<hgroup class="shop_right">
					<header class="shop_detail_header">
						<h4 class="" class="shop_title ellipsis">{{item.shopName}}</h4>
						<ul class="shop_detail_ul">
							<li class="supports">包</li>
						</ul>
					</header>
					<h5 class="rating_order_num">
						<section class="rating_order_num_left">
							<section class="rating_section">
								<!--<rating-star :rating='item.rating'></rating-star>-->
								<span class="rating_num">111</span>
							</section>
							<section class="order_section">
								月售000单
							</section>
						</section>
						<section class="rating_order_num_right">
							<span class="delivery_style delivery_left" >111</span>
							<span class="delivery_style delivery_right">准时达</span>
						</section>
					</h5>
					<h5 class="fee_distance">
						<p class="fee">
							¥00起送
							<span class="segmentation">/</span>
							111
						</p>
						<p class="distance_time">
							<span>100km
								<span class="segmentation">/</span>
							</span>
							<span>位置</span>
							<span class="segmentation">/</span>
							<span class="order_time">14点</span>
						</p>
					</h5>
				</hgroup>
			</router-link>
		</ul>
		<p class="empty_data" v-if="allLoaded">没有更多了</p>
		</mt-loadmore>
		<!--<ul class="animation_opactiy" v-for="item in 4" v-if="flag">
			<li class="list_back_li">
				<img src="../../images/shopback.svg" class="list_back_svg">
			</li>
		</ul>-->
		
	</div>
</template>

<script>
export default {
	data(){
		return {
			shopList:[],
			count:4, //每一页4条数据
			page:0, //第几页,
			allLoaded:false
			
		}
	},
	computed:{
		flag(){
			return !this.shopList.length
		}
	},
	created(){
		this.getList()
	},
	methods:{
		async getList(){
			var res = await this.$http.get("/shopList",{
				params:{
					count:this.count,
					page:this.page
				}
			})
			this.page = 0;
			console.log(res)
//			res.data.forEach(item=>{
//				this.shopList.push(item)
//			})
			this.shopList = res.data
		},
		loadTop(){
			
			//...
			this.getList()
			this.$refs.loadmore.onTopLoaded();
		},
		async loadBottom(){
		  // 加载更多数据
		  this.page++;
		  	var res = await this.$http.get("/shopList",{
				params:{
					count:this.count,
					page:this.page
				}
			})
			console.log(res)
			if(!res.data.length){
				 this.allLoaded = true;// 若数据已全部获取完毕
			}else{
				res.data.forEach(item=>{
				   this.shopList.push(item)
			   })
			}
		    this.$refs.loadmore.onBottomLoaded();
		}
	}
}

</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	.shoplist_container{
		background-color: #fff;
		margin-bottom: 2rem;
	}
	.shop_li{
		display: flex;
		border-bottom: 0.025rem solid #f1f1f1;
		padding: 0.7rem 0.4rem;
	}
	.shop_img{
		@include wh(2.7rem, 2.7rem);
		display: block;
		margin-right: 0.4rem;
	}
	.list_back_li{
		height: 4.85rem;
		.list_back_svg{
			@include wh(100%, 100%)
		}
	}
	.shop_right{
		flex: auto;
		margin-left: 0.6rem;
		margin-top: 0.26rem;
		.shop_detail_header{
			@include fj;
			align-items: center;
			.shop_title{
				width: 8.5rem;
				color: #333;
				padding-top: .01rem;
				@include font(0.65rem, 0.65rem, 'PingFangSC-Regular');
				font-weight: 700;
			}
			.premium::before{
				content: '品牌';
				display: inline-block;
				font-size: 0.5rem;
				line-height: .6rem;
				color: #333;
				background-color: #ffd930;
				padding: 0 0.1rem;
				border-radius: 0.1rem;
				margin-right: 0.2rem;
			}
			.shop_detail_ul{
				display: flex;
				transform: scale(.8);
				margin-right: -0.3rem;
				.supports{
					@include sc(0.5rem, #999);
					border: 0.025rem solid #f1f1f1;
					padding: 0 0.04rem;
					border-radius: 0.08rem;
					margin-left: 0.05rem;
				}
			}
		}
		.rating_order_num{
			@include fj(space-between);
			height: 0.6rem;
			margin-top: 0.52rem;
			.rating_order_num_left{
				@include fj(flex-start);
				.rating_section{
					display: flex;
					.rating_num{
						@include sc(0.4rem, #ff6000);
						margin: 0 0.2rem;
					}
				}
				.order_section{
					transform: scale(.8);
					margin-left: -0.2rem;
					@include sc(0.4rem, #666);
				}
			}
			.rating_order_num_right{
				display: flex;
				align-items: center;
				transform: scale(.7);
				min-width: 5rem;
				justify-content: flex-end;
				margin-right: -0.8rem;
				.delivery_style{
					font-size: 0.4rem;
					padding: 0.04rem 0.08rem 0;
					border-radius: 0.08rem;
					margin-left: 0.08rem;
					border: 1px;
				}
				.delivery_left{
					color: #fff;
					background-color: $blue;
					border: 0.025rem solid $blue;
				}
				.delivery_right{
					color: $blue;
					border: 0.025rem solid $blue;
				}
			}
		}
		.fee_distance{
			margin-top: 0.52rem;
			@include fj;
			@include sc(0.5rem, #333);
			.fee{
				transform: scale(.9);
				@include sc(0.5rem, #666);
			}
			.distance_time{
				transform: scale(.9);
				span{
					color: #999;
				}
				.order_time{
					color: $blue;
				}
				.segmentation{
					color: #ccc;
				}
			}
		}
	}
	.loader_more{
		@include font(0.6rem, 3);
		text-align: center;
	    color: #999;
	}
	.empty_data{
		@include sc(0.5rem, #666);
		text-align: center;
		line-height: 2rem;
	}
	.return_top{
		position: fixed;
		bottom: 3rem;
		right: 1rem;
		.back_top_svg{
			@include wh(2rem, 2rem);
		}
	}
	.loading-enter-active, .loading-leave-active {
		transition: opacity 1s
	}
	.loading-enter, .loading-leave-active {
		opacity: 0
	}
</style>
