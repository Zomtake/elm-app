var Koa = require('koa');
var app = new Koa();


//静态资源
var koaStatic = require("koa-static")
app.use(koaStatic("./uploads"))

//跨域
var koaCors = require("koa2-cors")
app.use(koaCors())

//接收post数据-》koa-body
var koaBody = require("koa-body")
app.use(koaBody())

//引入一个总路由
var router = require("./routers")
//把总路由使用在中间件上
app.use(router.routes())

app.listen(3000,function(){
	console.log("服务器已启动成功")
})

