var Router = require("koa-router")
var address = require("../model/address")
var addressRouter = new Router()

addressRouter.post("/",async (ctx,next)=>{
	var web = ctx.request.body;
	console.log(web)
	var oneData = new address(web)
	var res = await oneData.save()
	if(res){
		ctx.body = {
			status:1,
			message: "添加成功"
		}
	}else{
		ctx.body = {
			status:0,
			message: "添加失败"
		}
	}
	
})

addressRouter.get("/",async (ctx,next)=>{
	var userName = ctx.query.userName;
	var res = await address.find({userName})
	ctx.body = res
})


module.exports = addressRouter
