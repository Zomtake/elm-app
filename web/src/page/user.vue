<template>
    <div class="profile_page">
       <mt-header title="个人中心" fixed>
		  <a @click="$router.go(-1)" slot="left">
		    <mt-button icon="back"></mt-button>
		  </a>
		</mt-header>
       
        <section>
            <section class="profile-number">
                <router-link to="/user" class="profile-link">
                    <img src="../../static/20180808151217543.jpg" class="privateImage" >
                    <div class="user-info">
                        <p>{{$store.state.user}}</p>
                        <p>
                            <span class="user-icon">
                               <img src="../../static/icon1.png"/>
                            </span>
                            <span class="icon-mobile-number">{{168889993322}}</span>
                        </p>
                    </div>
                    <span class="arrow">
                       	  <img src="../../static/icon2.png"/>
                    </span>
                </router-link>
            </section>
            <section class="info-data">
                <ul class="clear">
                    <router-link to="/user" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>{{20}}</b>元</span>
                        <span class="info-data-bottom">我的余额</span>
                    </router-link>
                    <router-link to="/user" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>{{2}}</b>个</span>
                        <span class="info-data-bottom">我的优惠</span>
                    </router-link>
                    <router-link to="/user" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>{{1672}}</b>分</span>
                        <span class="info-data-bottom">我的积分</span>
                    </router-link>
                </ul>
            </section>
            <section class="profile-1reTe">
                <!-- 我的订单 -->
                <router-link to='/orderList' class="myorder">
                    <aside>
                        <img src="../../static/icon3.png"/>
                    </aside>
                    <div class="myorder-div">
                        <span>我的订单</span>
                        <span class="myorder-divsvg">
                              <img src="../../static/icon8.png"/>
                        </span>
                    </div>
                </router-link>
                <!-- 积分商城 -->
                <a href='#' class="myorder">
                    <aside>
                         <img src="../../static/icon4.png"/>
                    </aside>
                    <div class="myorder-div">
                        <span>积分商城</span>
                        <span class="myorder-divsvg">
                             <img src="../../static/icon8.png"/>
                        </span>
                    </div>
                </a>
                <!-- 饿了么会员卡 -->
                <router-link to='/user' class="myorder">
                    <aside>
                         <img src="../../static/icon5.png"/>	
                    </aside>
                    <div class="myorder-div">
                        <span>饿了么会员卡</span>
                        <span class="myorder-divsvg">
                              <img src="../../static/icon8.png"/>
                        </span>
                    </div>
                </router-link>
            </section>
            <section class="profile-1reTe">
                <!-- 服务中心 -->
                <router-link to='/user' class="myorder">
                    <aside>
                        <img src="../../static/icon6.png"/>
                    </aside>
                    <div class="myorder-div">
                        <span>服务中心</span>
                        <span class="myorder-divsvg">
                             <img src="../../static/icon8.png"/>
                        </span>
                    </div>
                </router-link>
                <!-- 下载饿了么APP -->
                <router-link to='/user' class="myorder">
                    <aside>
                         <img src="../../static/icon7.png"/>
                    </aside>
                    <div class="myorder-div" style="border-bottom:0;">
                        <span>下载饿了么APP</span>
                        <span class="myorder-divsvg">
                             <img src="../../static/icon8.png"/>
                        </span>
                    </div>
                </router-link>
            </section>
        </section>
       <my-footer :active="$route.path"></my-footer>
    </div>
</template>

<script>
</script>

<style lang="scss" scoped>
   @import '../style/mixin';

    .profile_page{
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
   .profile-number{
        padding-top:1.95rem;
        .profile-link{
            display:block;
            display:flex;
            box-align: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            background:$blue;
            padding: .666667rem .6rem;
            .privateImage{
                display:inline-block;
                @include wh(2.5rem,2.5rem);
                border-radius:50%;
                vertical-align:middle;
                .privateImage-svg{
                    background:$fc;
                    border-radius:50%;
                    @include wh(2.5rem,2.5rem);
                }
            }
            .user-info{
                margin-left:.48rem;
                -webkit-box-flex: 1;
                -ms-flex-positive: 1;
                flex-grow: 1;
                p{
                    font-weight:700;
                    @include sc(.8rem,$fc);
                    .user-icon{
                        @include wh(0.5rem,0.75rem);
                        display:inline-block;
                        vertical-align:middle;
                        line-height:0.75rem;
                        .icon-mobile{
                            @include wh(100%,100%);
                        }
                    }
                    .icon-mobile-number{
                        display:inline-block;
                        @include sc(.57333rem,$fc);

                    }
                }

            }
            .arrow{
                @include wh(.46667rem,.98rem);
                display:inline-block;
                svg{
                   @include wh(100%,100%);
                }
            }
        }
   }
   .info-data{
        width:100%;
        background:$fc;
        box-sizing: border-box;
        ul{
            .info-data-link{
                float:left;
                width:33.33%;
                display:inline-block;
                border-right:1px solid #f1f1f1;
                span{
                    display:block;
                    width:100%;
                    text-align:center;
                }
                .info-data-top{
                    @include sc(.55rem,#333);
                    padding: .853333rem 0 .453333rem;
                    b{
                        display:inline-block;
                        @include sc(1.2rem,#f90);
                        font-weight:700;
                        line-height:1rem;
                        font-family: Helvetica Neue,Tahoma;
                    }
                }
                .info-data-bottom{
                    @include sc(.57333rem,#666);
                    font-weight:400;
                    padding-bottom:.453333rem;

                }
            }
            .info-data-link:nth-of-type(2){
                .info-data-top{
                    b{
                        color:#ff5f3e;
                    }
                }

            }
            .info-data-link:nth-of-type(3){
                border:0;
                .info-data-top{
                    b{
                        color:#6ac20b;
                    }
                }
            }
        }
   }
   .profile-1reTe{
        margin-top:.4rem;
        background:$fc;
        .myorder{
            padding-left:1.6rem;
            display:flex;
            align-items: center;
            aside{
                @include wh(.7rem,.7rem);
                margin-left:-.866667rem;
                margin-right:.266667rem;
                display:flex;
                align-items: center;
                svg{
                    @include wh(100%,100%);
                }
            }
            .myorder-div{
                width:100%;
                border-bottom:1px solid #f1f1f1;
                padding:.433333rem .266667rem .433333rem 0;
                @include sc(.7rem,#333);
                display:flex;
                justify-content:space-between;
                span{
                    display:block;
                }
                .myorder-divsvg{
                    @include wh(.46667rem,.466667rem);
                    svg{
                        @include wh(100%,100%);
                    }
                }
            }
        }
        .myorder:nth-of-type(3) .myorder-div{
            border:0;
        }
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
