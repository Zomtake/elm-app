var Router = require("koa-router")

var addShop = new Router();

//目标：服务器要接收这一次上传的图片
//以前接收post请求的数据用的是koa-body中间件
//要接收post请求的（文件）用的是koa-multer中间件
//1. npm install koa-multer
//2.引入 multer是一个功能（多部件的接收器）
var multer = require("koa-multer")
//3.实例化一个上传对象
//参数：1. 图片要存储的目标文件夹
//dest 目标（缩写）
var photo = multer({dest:'uploads/'})

//4.在这次请求时，要获取”这一张“图
//single单一（”这一张“图）
addShop.post("/photo",photo.single("file"),(ctx,next)=>{
	//给前端返回上传好的文件的名字
	ctx.body = ctx.req.file.filename
})
var shop = require("../model/shop")
addShop.post("/uploadData",async (ctx,next)=>{
	var web = ctx.request.body
	console.log(web)
	//要把web数据， 写到数据库（shop表）中
	var oneData = new shop(web)
	await oneData.save()
	ctx.body = "店铺添加成功"
})


module.exports = addShop