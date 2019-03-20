<template>
	<div>
	  <mt-header title="用户登录" fixed>
		  <span @click="$router.go(-1)" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </span>
		</mt-header>
	
    <div class="loginContainer">
        <form class="loginForm" >
            <section class="input_container">
                <input type="text" placeholder="账号" v-model="user.userName">
            </section>
            <section class="input_container">
            	<input v-if="flag"  type="text" placeholder="密码" v-model="user.pwd">
                <input v-else type="password" placeholder="密码" v-model="user.pwd">
               
                <mt-switch v-model="flag"></mt-switch>
            </section>
            <section class="input_container captcha_code_container">
                <input type="text" placeholder="验证码" maxlength="4"  v-model="valiCode">
                <div class="img_change_img">
                    <validate :identifyCode="identifyCode"></validate>
                    <div class="change_img" @click="refreshCode">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section>
        </form>
        <p class="login_tips">
            温馨提示：未注册过的账号，登录时将自动注册
        </p>
        <p class="login_tips">
            注册过的用户可凭账号密码登录
        </p>
        <div class="login_container" @click="login()">登录</div>
        <router-link to="/forget" class="to_forget">重置密码？</router-link>
     
    </div>
    </div>
</template>

<script>
import validate from "@/components/validate"
export default {
	components:{validate},
	data(){
		return {
			user:{
				userName:"",
				pwd:""
			},
			valiCode:"",
			flag:false,
			identifyCodes: "1234567890",
      		identifyCode: ""
		}
	},
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    },
    async login(){
    	if (!this.user.userName) {
    		alert("用户名必填")
    		return false
    	}
    	if (!this.user.pwd) {
    		alert("密码必填")
    		return false
    	}
    	if(this.valiCode.toUpperCase() == this.identifyCode.toUpperCase()){
    	    var res = await this.$http.post("/user",this.user)
    	    console.log(res)
    	    if (res.data.status) {
    	    	this.$store.commit("changeUser",this.user.userName)
    	    	this.$router.go(-1)
    	    }else{
    	    	alert(res.data.message)
    	    }
    	}else{
    		alert("no")
    	}
    }
  }

}
</script>

<style lang="scss" scoped>
    @import '../style/mixin';
	.mint-header { height: 2rem; top: 0; display: flex; align-items: center;}
    .loginContainer{
        padding-top: 1.95rem;
        p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .change_login{
        position: absolute;
        @include ct;
        right: 0.75rem;
        @include sc(.7rem, #fff);
    }

    .loginForm{
        background-color: #fff;
        margin-top: .6rem;
        .input_container{
            display: flex;
            justify-content: space-between;
            padding: .6rem .8rem;
            border-bottom: 1px solid #f1f1f1;
            input{
                @include sc(.7rem, #666);
            }
            button{
                @include sc(.65rem, #fff);
                font-family: Helvetica Neue,Tahoma,Arial;
                padding: .28rem .4rem;
                border: 1px;
                border-radius: 0.15rem;
            }
            .right_phone_number{
                background-color: #4cd964;
            }
        }
        .phone_number{
            padding: .3rem .8rem;
        }
        .captcha_code_container{
            height: 2.2rem;
            .img_change_img{
                display: flex;
                align-items: center;
                img{
                    @include wh(3.5rem, 1.5rem);
                    margin-right: .2rem;
                }
                .change_img{
                    display: flex;
                    flex-direction: 'column';
                    flex-wrap: wrap;
                    width: 2rem;
                    justify-content: center;
                    p{
                        @include sc(.55rem, #666);
                    }
                    p:nth-of-type(2){
                        color: #3b95e9;
                        margin-top: .2rem;
                    }
                }
            }
        }
    }
    .login_tips{
        @include sc(.5rem, red);
        padding: .4rem .6rem;
        line-height: .5rem;
        a{
            color: #3b95e9;
        }
    }
    .login_container{
        margin: 0 .5rem 1rem;
        @include sc(.7rem, #fff);
        background-color: #4cd964;
        padding: .5rem 0;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;
    }
    .button_switch{
        background-color: #ccc;
        display: flex;
        justify-content: center;
        @include wh(2rem, .7rem);
        padding: 0 .2rem;
        border: 1px;
        border-radius: 0.5rem;
        position: relative;
        .circle_button{
            transition: all .3s;
            position: absolute;
            top: -0.2rem;
            z-index: 1;
            left: -0.3rem;
            @include wh(1.2rem, 1.2rem);
            box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0,0,0,.1);
            background-color: #f1f1f1;
            border-radius: 50%;
        }
        .trans_to_right{
            transform: translateX(1.3rem);
        }
        span{
            @include sc(.45rem, #fff);
            transform: translateY(.05rem);
            line-height: .6rem;
        }
        span:nth-of-type(2){
            transform: translateY(-.08rem);
        }
    }
    .change_to_text{
        background-color: #4cd964;
    }
    .to_forget{
        float: right;
        @include sc(.6rem, #3b95e9);
        margin-right: .3rem;
    }
</style>
