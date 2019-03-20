var mongo = require("../mongo")

var adminSchema = mongo.Schema({
	userName:String,
	pwd:String,
	createTime:{
		type:Date,
		default:new Date()
	},
	city:{
		type:String,
		default:"全国"
	}
})

var admin = mongo.model("admin",adminSchema)

module.exports = admin
