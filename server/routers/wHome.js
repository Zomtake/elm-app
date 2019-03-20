var Router = require("koa-router")
var axios = require("axios")
var home = new Router()
home.get("/city",async (ctx,next)=>{
	//请求腾讯给的接口地址
	var res = await axios.get("https://apis.map.qq.com/ws/location/v1/ip?key=2SYBZ-UFQR2-ESTUZ-C4JLL-HFHLO-4MBYN")
	//2.返回给我们的前端
	console.log(res.data)
	ctx.body = res.data
})


home.get("/address",async (ctx,next)=>{
	var region = ctx.query.region;
	var keyword = ctx.query.keyword;
	var key = "2SYBZ-UFQR2-ESTUZ-C4JLL-HFHLO-4MBYN"
	//https://apis.map.qq.com/ws/place/v1/suggestion/?region=北京&keyword=美食&key=UV5BZ-XK63I-WIJGB-5YU2C-H67F3-CCF54
	var res = await axios.get("https://apis.map.qq.com/ws/place/v1/suggestion/",{
		params:{
			region,keyword,key
		}
	})
	console.log(res.data)
	ctx.body = res.data
})

module.exports = home
