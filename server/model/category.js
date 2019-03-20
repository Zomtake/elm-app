var mongo = require("../mongo")

var categoryGZ = mongo.Schema({
	shopId:String,
	categories:Array
})

var category = mongo.model("category",categoryGZ)

module.exports = category
