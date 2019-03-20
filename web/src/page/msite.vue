<template>
    <div>
    	<mt-header :title="$store.state.address">
		  <router-link to="/" slot="left">
		    <mt-button icon="search"></mt-button>
		  </router-link>
		  <mt-button icon="more" slot="right"></mt-button>
		</mt-header>
    	
    	<mt-swipe :auto="0" style="height: 185px;background: #fff;">
		  <mt-swipe-item>
		  	    <span v-for="(item,index) in navList" :key="index" class="link_to_food">
			  	<router-link to="/" >
	    			<figure>
	    				<img :src="item.img">
	    				<figcaption>{{item.title}}</figcaption>
	    			</figure>
	    		</router-link>
	    		</span>
		  </mt-swipe-item>
		  <mt-swipe-item>
		  	  <span v-for="(item,index) in navList" :key="index" class="link_to_food">
			  	<router-link to="/" >
	    			<figure>
	    				<img :src="item.img"/>
	    				<figcaption>{{item.title}}</figcaption>
	    			</figure>
	    		</router-link>
	    		</span>
		  </mt-swipe-item>
		</mt-swipe>

    	<div class="shop_list_container">
	    	<header class="shop_header">
	    		<svg class="shop_icon">
	    			<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
	    		</svg>
	    		<span class="shop_header_title">附近商家</span>
	    	</header>
	    	<shop-list></shop-list>
    	</div>
    	<my-footer :active="$route.path"></my-footer>
    </div>    
  
</template>

<script>

//import footGuide from 'src/components/footer/footGuide'
import shopList from '@/components/common/shoplist'

export default {
	data(){
		return {
			navList:[
				{title:"甜品饮品",img:"./static/t1.jpeg"},
				{title:"商超便利",img:"./static/t2.jpeg"},
				{title:"美食",img:"./static/t3.jpeg"},
				{title:"简餐",img:"./static/t4.jpeg"},
				{title:"新店特惠",img:"./static/t5.jpeg"},
				{title:"准时达",img:"./static/t6.jpeg"},
				{title:"预定早餐",img:"./static/t7.jpeg"},
				{title:"土豪推荐",img:"./static/t8.jpeg"}
			]
		}
	},
    components: {
    	shopList
//  	footGuide,
    }
}

</script>

<style lang="scss" scoped>
    @import '../style/mixin';

	.link_to_food{
		 float: left;
			width: 25%;
			padding: 0.3rem 0rem;
			@include fj(center);
			figure{
				img{
					margin-bottom: 0.3rem;
					@include wh(1.8rem, 1.8rem);
				}
				figcaption{
					text-align: center;
					@include sc(0.55rem, #666);
				}
			}
		}
		
	.link_search{
		left: .8rem;
		@include wh(.9rem, .9rem);
		@include ct;
	}
	.msite_title{
		@include center;
        width: 50%;
        color: #fff;
        text-align: center;
        margin-left: -0.5rem;
        .title_text{
            @include sc(0.8rem, #fff);
            text-align: center;
            display: block;
        }
	}
	.msite_nav{
		padding-top: 2.1rem;
		background-color: #fff;
		border-bottom: 0.025rem solid $bc;
		height: 10.6rem;
		.swiper-container{
			@include wh(100%, auto);
			padding-bottom: 0.6rem;
			.swiper-pagination{
				bottom: 0.2rem;
			}
		}
		.fl_back{
			@include wh(100%, 100%);
		}
	}
	.food_types_container{
		display:flex;
		flex-wrap: wrap;
		
	}
	.shop_list_container{
		margin-top: .4rem;
		border-top: 0.025rem solid $bc;
		background-color: #fff;
		.shop_header{
			.shop_icon{
				fill: #999;
				margin-left: 0.6rem;
				vertical-align: middle;
				@include wh(0.6rem, 0.6rem);
			}
			.shop_header_title{
				color: #999;
				@include font(0.55rem, 1.6rem);
			}
		}
	}

</style>
