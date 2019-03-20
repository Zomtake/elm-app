 <template>
    <div class="address_page">
         <mt-header title="新增地址" fixed>
			  <router-link to="/order/chooseAddress" slot="left">
			    <mt-button icon="back"></mt-button>
			  </router-link>
			</mt-header>
       
        <section class="page_text_container">
            <section class="section_list">
                <span class="section_left">联系人</span>
                <section class="section_right">
                     <input type="text" name="name" placeholder="你的名字" v-model="obj.yourName"  class="input_style">
                    <div class="choose_sex">
                        <span class="choose_option">
                        	<input type="radio" value="先生" id="sir" v-model="obj.sex" />
                            <label for="sir">先生</label>
                        </span>
                        <span class="choose_option">
                        	<input type="radio" value="女士" id="lady" v-model="obj.sex" />
                            <label for="lady">女士</label>
                        </span>
                    </div>
                </section>
            </section>
            <section class="section_list">
                <span class="section_left">联系电话</span>
                <section class="section_right">
                    <div class="phone_add">
                        <input type="text" name="phone" v-model="obj.phone" placeholder="你的手机号" class="input_style">
                    </div>
                </section>
            </section>
            <section class="section_list">
                <span class="section_left">送餐地址</span>
                <section class="section_right">
                	<input type="text" name="address_detail" placeholder="详细地址（如门牌号等）" v-model="obj.address" class="input_style">
                </section>
            </section>
            <section class="section_list">
                <span class="section_left">标签</span>
                <section class="section_right">
                    <input type="text" name="tag" placeholder="无/家/学校/公司" v-model="obj.tag" class="input_style">
                </section>
            </section>
        </section>
        <div class="determine" @click="add()">确定</div>
    </div>
</template>

<script>
  export default {
  	 data(){
  	 	return{
  	 		obj:{
  	 			userName:this.$store.state.userName,
  	 			yourName:"",
  	 			sex:"先生",
  	 			phone:"",
  	 			address:"",
  	 			tag:""
  	 		}
  	 	}
  	 },
  	 methods:{
  	 	async add(){
  	 		var res = await this.$http.post("/address",this.obj)
  	 		console.log(res)
  	 		if (res.data.status) {
  	 			this.$router.push("/order/chooseAddress")
  	 		} else{
  	 			alert(res.data.message)
  	 		}
  	 	}
  	 }
  }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .address_page{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        z-index: 204;
        padding-top: 1.95rem;
        p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .page_text_container{
        background-color: #fff;
        padding: 0 .7rem;
    }
    .section_list{
        display: flex;
        border-bottom: 0.025rem solid #f5f5f5;
        .section_left{
            @include sc(.7rem, #333);
            flex: 2;
            line-height: 2.5rem;
        }
        .section_right{
            flex: 5;
            .input_style{
                width: 100%;
                height: 2.5rem;
                @include sc(.7rem, #999);
            }
            .phone_bk{
                border-top: 0.025rem solid #f5f5f5;
            }
            .phone_add{
                @include fj;
                align-items: center;
            }
            .choose_sex{
                display: flex;
                line-height: 2.5rem;
                border-top: 0.025rem solid #f5f5f5;
                .choose_option{
                    @include sc(.7rem, #333);
                    display: flex;
                    align-items: center;
                    margin-right: .8rem;
                    svg{
                        margin-right: .3rem;
                        @include wh(.8rem, .8rem);
                        fill: #ccc;
                    }
                    .choosed{
                        fill: #4cd964;
                    }
                }
            }
            .choose_address{
                @include sc(.7rem, #999);
                line-height: 2.5rem;
                border-bottom: 0.025rem solid #f5f5f5;
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
        margin-top: .6rem;
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
