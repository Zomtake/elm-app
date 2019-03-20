var Router = require("koa-router")
var shop = require("../model/shop")
var shopList = new Router();
shopList.get("/",async (ctx,next)=>{
	var count = Number(ctx.query.count);
	var page = Number(ctx.query.page);
	console.log(count)
	var res = await shop.find({}).skip(page*count).limit(count).sort({_id:-1})
	ctx.body = res
})
shopList.delete("/",async (ctx,next)=>{
	var _id = ctx.query.foodId;
	var res = await shop.remove({_id})
	ctx.body = "删除成功"
})
module.exports = shopList