var Router = require("koa-router")
var category = require("../model/category")
var addGoods = new Router()
addGoods.post("/category",async (ctx,next)=>{
	var web = ctx.request.body;
	
	//先看分类表中有没有 当前店铺的 商品分类
	var res = await category.findOne({shopId:web.shopId})
	if(res){
		//如果能找到分类， res就是这个分类的数据
		res.categories.push(web.oneCategory)
		await category.update({shopId:web.shopId},res)
		ctx.body = "添加成功"
	}else{
		//没有找到分类，  就 写入一个新的分类数据
		var obj = {
			shopId:web.shopId,
			categories:[web.oneCategory]
		}
		var oneData = new category(obj)
		await oneData.save()
		
		ctx.body = "(初)添加成功"
	}
})

addGoods.get("/category",async (ctx,next)=>{
	var shopId = ctx.query.shopId
	var res = await category.findOne({shopId})
	ctx.body = res;
})

//multer
var multer = require("koa-multer")
var upload = multer({dest:'uploads/'})
addGoods.post("/upload",upload.single("file"),(ctx,next)=>{
	ctx.body = ctx.req.file.filename
})

var goods = require("../model/goods")
//添加商品
addGoods.post("/",async (ctx,next)=>{
	var web = ctx.request.body;
	var oneData = new goods(web)
	await oneData.save()
	ctx.body = "商品添加成功"
})

//获取商品
addGoods.get("/",async (ctx,next)=>{
	var id = ctx.query.shopId;
	console.log(id)
	if(id !== "undefined"){
		var res = await goods.find({id})
		ctx.body = res
	}else{
		var res = await goods.find({})
		ctx.body = res
	}
})
//删除商品
addGoods.delete("/",async (ctx,next)=>{
	var _id = ctx.query.foodId;
	var res = await goods.remove({_id})
	ctx.body = "删除成功"
})

//修改商品
addGoods.put("/",async (ctx,next)=>{
	var web = ctx.request.body
	await goods.update({_id:web._id},web)
	ctx.body = "修改成功"
})

module.exports = addGoods