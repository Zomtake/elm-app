var mongo = require("../mongo")

var shopSchema = mongo.Schema({
	shopName:String,
	address:String,
	phone:Number,
	info:String,
	slogan:String,
	category:String,
	sendPrice:Number,
	startPrice:Number,
	startTime:String,
	endTime:String,
	sale:String,
	saleList:Array,
	shopPhoto:String,
	feature:Object
})

var shop = mongo.model("shop",shopSchema)

module.exports = shop
