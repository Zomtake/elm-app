var mongo = require("../mongo")


var gz = mongo.Schema({
	userName:String,
	yourName:String,
	sex:String,
	phone:String,
	address:String,
	tag:String
})

var address = mongo.model("address",gz)

module.exports = address
