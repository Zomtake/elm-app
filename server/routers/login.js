//专门处理前端login页面发来的请求
//引入 admin表对象
var admin = require("../model/admin")
//1.引入路由
var Router = require("koa-router")
//2.实例化一个专门（）路由对象
var login = new Router();

//路由接口
login.post("/",async (ctx,next)=>{
	//1.要拿到前端发来的post数据（用户名和密码
	console.log(ctx.request.body)
	//{ userName: '1111111111', pwd: '11111111111' }
	var web = ctx.request.body;
	//2.去和 数据库中的 admin表中的一条数据去做比对
	//比对结果有三种：
	   //1.用户名和密码都能对上，返回 登录成功
	   //2.用户名能对上但密码不对，返回 密码错误
	   //3.用户名对不上，说明没有这个用户，返回 注册成功
	  var res = await admin.findOne({userName:web.userName})
	  //res就是成功找到的一条数据，但是如果没有找到res=none
	  if(res){
	  	  if(res.pwd == web.pwd){
	  	  	ctx.body = {
	  	  		status:1,
	  	  		state:'success',
	  	  		message:"登录成功"
	  	  	}
	  	  }else{
	  	  	ctx.body = {
	  	  		status:0,
	  	  		state:'error',
	  	  		message:"密码错误"
	  	  	}
	  	  }
	  }else{
	  	//把前端发来的数据做成  数据表中的一行 数据
	  	 var oneData = new admin(web)
	  	 //存到数据表中
	  	 await oneData.save()
	  	 ctx.body = {
	  	 	status:2,
	  	 	state:'success',
	  	 	message:"注册成功"
	  	 }
	  }
	
})

//node用的是commonJS的语法 默认导出
module.exports = login