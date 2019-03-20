//创建一个总路由，用来组装所有的子路由
//引入子路由
var login = require("./login")
var adminList = require("./adminList")
var addShop = require("./addShop")
var shopList = require("./shopList")
var addGoods = require("./addGoods")
var home = require("./wHome")
var user = require("./webLogin")
var address = require("./address")
var order = require("./order")

//创建一个总路由
var Router = require("koa-router")
//router->总路由对象
var router = new Router()
//router职责->用来组装子路由
//use->装载子路由
router.use("/login",login.routes())
router.use("/adminList",adminList.routes())
router.use("/addShop",addShop.routes())
router.use("/shopList",shopList.routes())
router.use("/addGoods",addGoods.routes())
router.use("/home",home.routes())
router.use("/user",user.routes())
router.use("/address",address.routes())
router.use("/order",order.routes())

module.exports = router