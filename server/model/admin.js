//引入数据库
var mongo = require("../mongo")

//创建一个表前还需要准备好 表规则
var adminSchema = mongo.Schema({
	//规则外部可以往这个表中写入哪些字段，及类型
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
//创建一个 表（集合）（数据模型）
var admin = mongo.model("admin",adminSchema)

//现在 表创建完成了， 导出 给 其它的模块使用
module.exports = admin

