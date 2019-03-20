var mongo = require("../mongo")

var goodsGZ = mongo.Schema({
	id:String,
	category:String,
	foodName:String,
	sale:String,
	detail:String,
	style:String,
	size:String,
	boxPrice:Number,
	price:Number,
    sizeName:String,
    sizes:Array,
    photo:String
})
var goods = mongo.model("goods",goodsGZ)

module.exports = goods