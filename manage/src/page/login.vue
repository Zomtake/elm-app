<template>
	<div class="login">
		<transition name="slide">
			<div class="login-centent" v-if="flag">
				<h1>设计1班管理系统</h1>
				<!--表单  rule规则  ref是vue给每一个组件提供的用来获取内部的值的一个属性
					ref一般用于 不考虑组件关系，直截获取内部的值
					我们可以给任意一个组件给一个标记（ref）标记的值（myForm）, 取值时用this.$ref.myForm
				-->
				<el-form :model="ruleForm" :rules="rules" ref="myForm"  class="demo-ruleForm">
					<!--label用来写输入框前面的文字    prop传入验证规则 -->
					<el-form-item label="" prop="userName">
						<el-input v-model="ruleForm.userName" placeholder="用户名"></el-input>
					</el-form-item>
					<el-form-item label="" prop="pwd">
						<el-input v-model="ruleForm.pwd" placeholder="密码"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm()" style="width:100%">登录</el-button>
				  </el-form-item>
				</el-form>
				
				<div class="login-tag">
					<p>温馨提示：</p>
					<p>未登录过的新用户，自动注册</p>
					<p>注册过的用户可凭账号密码登录</p>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	data(){
		return {
			flag:false,
			ruleForm:{
				userName:"",
				pwd:""
			},
			rules:{
				userName:[
					{
						required:true,message:'请输入用户名',trigger:'blur'
					},
					{
						min:2,max:10,message:'长度在4到10个字符',trigger:'blur'
					}
				],
				pwd:[
					{
						required:true,message:'请输入密码',trigger:'blur'
					},
					{
						min:3,max:16,message:'长度在6到16个字符',trigger:'blur'
					}
				]
			}
		}
	},
	//当页面加载完成时，触发的钩子函数
	//当Vue实例中的数据挂载到网页上时，...
	mounted(){
		this.flag = true
	},
	methods:{
		submitForm(){
			//element-ui的form组件上面有一个Validate的方法
			//这个方法是用来验证所有的规则是否通过
			//只要任意一个组件有做标记(ref),那么都会被全局
			//this实例对象的$refs对象所获取
			//所有我们现在才可以自由的调用form组件内部的方法
			//valid就是一个布尔值，如果所有的验证都通过返回true
			this.$refs.myForm.validate(async (valid)=>{
				if(valid){
					var res = await this.$http.post("/login",this.ruleForm)
					console.log(res)
					
					this.$message({
			          	showClose: true,
			          	message: res.data.message,
			          	type: res.data.state
			        });
			        
			        if(res.data.status){
			        	this.$store.commit("changeName",this.ruleForm.userName)
			        	this.$router.push("/")
			        }
				}else{
					this.$message({
			          	showClose: true,
			          	message: '用户名或密码错误',
			          	type: 'error'
			        });
				}
			})
		}
	}
}
</script>

<style scoped>
.login {background: #324057; height: 100%;}
.login-centent {
	width: 320px; height: 240px; background: #fff;
	border-radius: 6px; position: fixed; left: 50%; top: 50%;
	transform: translate(-50%,-50%); padding: 26px;
}
.login-centent h1 {
	position: absolute; top:-60px; color: #fff; font-size: 30px;
   left:19%;
}

.slide-enter,.slide-leave-to{
	opacity: 0; transform: translate(-50%,-100%);
}
.slide-enter-active,.slide-leave-active {
	transition: all 2s ease-in;
}
.login-tag p {
	text-align: center;
	color: #f30;
	font-size: 14px;
}
</style>