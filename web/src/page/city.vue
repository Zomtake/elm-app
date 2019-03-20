<template>
  	<div class="city_container">
        
        <mt-header :title="city" fixed>
		  <router-link to="/" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		  <router-link to="/" slot="right">
		  <mt-button >切换城市</mt-button>
		   </router-link>
		</mt-header>
		        
        <form class="city_form">
            <div>
                <input type="search" v-model="inputValue" name="city" placeholder="输入学校、商务楼、地址" class="city_input input_style" required>
            </div>
            <div>
                <input type="button" name="submit" class="city_submit input_style" @click="find()" value="提交">
            </div>
        </form>
        <header  class="pois_search_history">搜索历史</header>
        <ul class="getpois_ul" >
            <li  v-for="(item,index) in obj" :key="index" @click="jump(item)">
                <h4 class="pois_name ellipsis">{{item.title}}</h4>
                <p class="pois_address ellipsis">{{item.address}}</p>
            </li>
        </ul>
        <footer class="clear_all_history" @click="clearAll()" v-if="obj.length">清空所有</footer>
        <div class="search_none_place" v-if="flag">很抱歉！无搜索结果</div>
    </div>
</template>

<script>
export default {
	data(){
		return{
			obj:[],
			inputValue:"",
			city:this.$route.query.city,
			flag:false
		}
	},
	methods:{
		async find(){
			var res = await this.$http.get("/home/address",{
				params:{
					region:this.city,
					keyword:this.inputValue
				}
			})
			console.log(res)
			
			this.flag = false
			if (res.data.data.length) {
				this.obj = res.data.data
			} else{
				this.flag = true
			}
		},
		clearAll(){
			this.obj = []
		},
		jump(item){
			this.$router.push("/msite")
			var position = item.location.lat+","+item.location.lng;
			this.$store.commit("changeCity",this.city);
			this.$store.commit("changeAddress",item.title);
			this.$store.commit("changeCity",position)
		}
	}
}
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .city_container{
        padding-top: 2.35rem;
    }
    .change_city{
        right: 0.4rem;
        @include sc(0.6rem, #fff);
        @include ct;
    }
    .city_form{
        background-color: #fff;
        border-top: 1px solid $bc;
        border-bottom: 1px solid $bc;
        padding-top: 0.4rem;
        div{
            width: 90%;
            margin: 0 auto;
            text-align: center;
            .input_style{
                border-radius: 0.1rem;
                margin-bottom: 0.4rem;
                @include wh(100%, 1.4rem);
            }
            .city_input{
                border: 1px solid $bc;
                padding: 0 0.3rem;
                @include sc(0.65rem, #333);
            }
            .city_submit{
                background-color: $blue;
                @include sc(0.65rem, #fff);
            }
        }
    }
    .pois_search_history{
        border-top: 1px solid $bc;
        border-bottom: 1px solid $bc;
        padding-left: 0.5rem;
        @include font(0.475rem, 0.8rem);
    }
    .getpois_ul{
        background-color: #fff;
        border-top: 1px solid $bc;
        li{
            margin: 0 auto;
            padding-top: 0.65rem;
            border-bottom: 1px solid $bc;
            .pois_name{
                margin: 0 auto 0.35rem;
                width: 90%;
               @include sc(0.65rem, #333);
            }
            .pois_address{
                width: 90%;
                margin: 0 auto 0.55rem;
                @include sc(0.45rem, #999);
            }
        }
    }
    .search_none_place{
        margin: 0 auto;
        @include font(0.65rem, 1.75rem);
        color: #333;
        background-color: #fff;
        text-indent: 0.5rem;
    }
    .clear_all_history{
        @include sc(0.7rem, #666);
        text-align: center;
        line-height: 2rem;
        background-color: #fff;
    }
</style>
