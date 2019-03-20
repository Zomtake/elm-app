//loading..实现：用的是element-ui-》 loading组件
import { Loading } from 'element-ui';
import { Message } from 'element-ui';

import axios from "axios"
axios.defaults.baseURL = "http://101.132.164.127:3000"
//学习axios时，只学过一个配置：默认的请求地址
//配置超时时间
axios.defaults.timeout = 5000
//今天目标是做loading....
//loading...什么时候开始：一个请求开始时，我们的Loding就开始了
//loading...什么时候结束：一个请求结束时，我们的Loding就结束了

//我如何知道一个请求什么时候开始？
//用到axios中的一个对象：拦截器 interceptors
//axios.interceptors.request.use((info)=>{}) 请求时的拦截器 
//axios.interceptors.response.use((info)=>{}) 响应时的拦截器

//第一个请求开始时，就开始一个loading。。。
//第二个 第三个...请求，不发loading

var count = 0; //做一个记数器，每有一个请求开始，我们就在记数器中，加一个
var loading = null
axios.interceptors.request.use((info)=>{
	if(count == 0){
		//info就是这一次发请求的数据：请求方式，地址，查询字符串...
		console.log("loading...开始了")
   	 //LoadingService 会返回一个 Loading 实例，可通过调用该实例
    //的 close 方法来关闭它
		loading = Loading.service();
	//让我们的这次请求（info） 通过拦截器
	}
	//每有一个请求开始，我们就在记数器中，加一个
	count++
	//console.log(count)
	return info
})


axios.interceptors.response.use((info)=>{
	count--
	//console.log(count)
	if(count == 0){
		//info就是这一次请求回来的数据：
		console.log("loading...结束了")
		loading.close()
		//让我们的这次请求（info） 通过拦截器
	}
	
	
	return info
},(err)=>{
	//失败的回调
	loading.close()
	Message({
          message: '请求数据失败，请重试...',
          type: 'error'
        })
})
export default axios