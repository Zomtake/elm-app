var Router = require("koa-router")
var Order = require("../model/Order")
var order = new Router();

order.post("/",async (ctx,next)=>{
	//1要把前端的post过来信息获取到
	var web = ctx.request.body;
	//2.把这个信息写到  Order的表中
	var oneData = new Order(web)
	await oneData.save()
	ctx.body = "下单成功"
})

module.exports = order