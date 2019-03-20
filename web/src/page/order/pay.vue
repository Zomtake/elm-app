 <template>
    <div class="rating_page">
        <mt-header title="订单支付" fixed>
		  <router-link to="/order" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
        
        <section class="show_time_amount">
        	<section>
                <header class="time_last">支付剩余时间</header>
                <p class="time">{{remaining}}</p>
                <!--<footer class="order_detail"">
                    <span>详情</span>
                    <span>¥36</span>
                </footer>   -->
            </section>
        </section>
       
        <p class="determine" @click="confrimPay()">确认支付</p>
        
    </div>
</template>

<script>
export default {
	data(){
		return {
			 countNum: 900,
			 timer:null
		}
	},
	computed:{
		remaining(){
			  let minute = parseInt(this.countNum/60);
                if (minute < 10) {
                    minute = '0' + minute;
                }
                let second = parseInt(this.countNum%60);
                if (second < 10) {
                    second = '0' + second;
                }
                return '00 : ' + minute + ' : ' + second;
		}
	},
	 mounted(){
            this.remainingTime();
        },
	methods:{
		confrimPay(){
			this.$router.push("/user")
		},
	   remainingTime(){
            clearInterval(this.timer);
            this.timer = setInterval(()=>{
                this.countNum --;
                if (this.countNum == 0) {
                    clearInterval(this.timer);
                    alert("超时")
                }
            }, 1000);
        }
	}
}
</script>
  
<style lang="scss" scoped>
    @import '../../style/mixin';
  
    .rating_page{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        z-index: 204;
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .show_time_amount{
		background-color: #fff;
        padding: .7rem;
        text-align: center;
        .time_last{
            @include sc(.6rem, #666);
            margin-top: 1rem;
        }
        .time{
            @include sc(1.5rem, #333);
            margin: .3rem 0 1rem;
        }
        .order_detail{
            @include fj;
            span{
                @include sc(.65rem, #666);
            }
            span:nth-of-type(2){
                color: #ff6000;
                font-weight: bold;
            }
        }
    }
    .pay_way{
        background-color: #f1f1f1;
        padding: 0 .7rem;
        @include sc(.7rem, #666);
        line-height: 1.8rem;
    }
    .pay_way_list{
        background-color: #fff;
        .pay_item{
            padding: .4rem .7rem;
            @include fj;
            align-items: center;
            line-height: 2.6rem;
            border-bottom: 0.025rem solid #f5f5f5;
         
            .choose_icon{
                @include wh(1rem, 1rem);
                fill: #ccc;
            }
            .choosed_way{
                fill: #4cd964;
            }
        }
    }
    .determine{
        background-color: #4cd964;
        @include sc(.7rem, #fff);
        text-align: center;
        margin: 0 .7rem;
        line-height: 1.8rem;
        border-radius: 0.2rem;
        margin-top: 0.5rem;
        font-weight: bold;
    }
    
</style>
