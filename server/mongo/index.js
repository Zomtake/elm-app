//连接mongoDB数据库
//node的第三方模块：mongoose
//下载：npm i mongoose -S
var mongo = require("mongoose")
//在连接前，请先 开启数据库服务器
//mongod --dbpath=D:\mongo\data
//useNewUrlParser 
mongo.connect("mongodb://127.0.0.1:27017/waimai",{ useNewUrlParser: true })
//监听 数据库已连接
//connected 已连接事件
mongo.connection.on("connected",function(){
	console.log("数据库已连接")
})

//监听 数据库连接失败
//error 错误事件
mongo.connection.on("error",function(err){
	console.log("数据库出错："+err)
})



module.exports = mongo