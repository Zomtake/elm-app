//操作admin这张表，需要引入admin表对象
var admin = require("../model/admin")
//想要处理前端请求，后端Koa，用koa-router路由
var Router = require("koa-router");
//通过Router构造函数 实例化一个专用的路由
var adminList = new Router();

//每一个路由（器）上面都可以配（多个）接口

//创建一个接口（对应处理一个具体的请求）
adminList.get("/",async (ctx,next)=>{
	//1.先把前端get方式传过来的 参数（查询字符串）
	//获取到这个页码
	var pageNumber = Number(ctx.query.pageNumber); //页码  2
	//skip跳跃 跳过s
    var res = await admin.find({},{pwd:0}).skip(4*(pageNumber-1)).limit(4).sort({createTime:-1})
	ctx.body = res
})

adminList.get("/count",async (ctx,next)=>{
	var res = await admin.count({})
	ctx.body = res
})

module.exports = adminList