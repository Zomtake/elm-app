var mongo = require("../mongo")

var gz = mongo.Schema({
		address:Object,
		orderPrice:Number,
		goodsList:Array,
		shop:Object,
		info:String,
		payMethod:String,
		userName:String,
		createTime:{
			type:Date,
			default:new Date()
		}
})
var Order = mongo.model("order",gz)

module.exports = Order