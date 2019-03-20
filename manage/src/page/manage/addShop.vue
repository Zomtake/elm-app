<template>
	
		<!-- model用来收集表单中的数据, rules所有规则 ，ref组件标记，有了这个标记
			我们就可以 在任意地方，获取到这个组件中的属性和方法
			label-width 描述文字占的宽
			el-form-item 表单中的每一项，主要用它来 完成表单项左边的文字
			el-form-item 上面的 prop 是用来接收 验证规则
			el-input 就是一个表单项组件 v-model 用来收集这一项的数据
		-->
	<div class="addShop">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="店铺名称" prop="shopName">
		       <el-input v-model="ruleForm.shopName"></el-input>
		    </el-form-item>
		    
		    <el-form-item label="详细地址" prop="address">
		       <el-input v-model="ruleForm.address"></el-input>
		    </el-form-item>
		    
		    <el-form-item label="联系电话" prop="phone">
		       <el-input v-model.number="ruleForm.phone"></el-input>
		    </el-form-item>
		    
		     <el-form-item label="店铺简介">
		       <el-input v-model.number="ruleForm.info"></el-input>
		    </el-form-item>
		    
		     <el-form-item label="店铺标语">
		       <el-input v-model.number="ruleForm.slogan"></el-input>
		    </el-form-item>
		    
		     <el-form-item label="店铺分类">
		         <el-select v-model="ruleForm.category" placeholder="请选择">
				    <el-option label="汉堡披萨" value="hanbao"></el-option>
				    <el-option label="生鲜果蔬" value="shenxian"></el-option>
				    <el-option label="饺子混沌" value="jiaozi"></el-option>
				    <el-option label="家常菜" value="jiachang"></el-option>
				    <el-option label="小吃馆" value="xiaochi"></el-option>
				    <el-option label="快餐" value="huancan"></el-option>
				    <el-option label="火锅串串" value="huoguo"></el-option>
				    <el-option label="海鲜" value="haixian"></el-option>
				  </el-select>
		    </el-form-item>
		    
		    <el-form-item label="店铺特点">
		    	品牌保证 <el-switch v-model="ruleForm.feature.promise"></el-switch>
		    	蜂鸟专送 <el-switch v-model="ruleForm.feature.express"></el-switch>
		    	新开店铺 <el-switch v-model="ruleForm.feature.newShop"></el-switch>
		    	外卖保 <el-switch v-model="ruleForm.feature.takeOut"></el-switch>
		    	<br />
		    	准时达<el-switch v-model="ruleForm.feature.onTime"></el-switch>
		    	开发票 <el-switch v-model="ruleForm.feature.invoice"></el-switch>
		    </el-form-item>	

		   <el-form-item label="配送费">
		   	  <el-input-number v-model="ruleForm.sendPrice" :min="0" :max="20"></el-input-number>
		   </el-form-item>
		   
		   <el-form-item label="起送价">
		      <el-input-number v-model="ruleForm.startPrice" :min="8"></el-input-number>
		   </el-form-item>	
		   
		    <el-form-item label="营业时间">
		    	
		    	<el-time-select
				    placeholder="起始时间"
				    v-model="ruleForm.startTime"
				    :picker-options="{
				      start: '00:00',
				      step: '00:30',
				      end: '24:00'
				    }">
				  </el-time-select>
				  
				  <el-time-select
				    placeholder="结束时间"
				    v-model="ruleForm.endTime"
				    :picker-options="{
				      start: '00:00',
				      step: '00:30',
				      end: '24:00',
				      minTime: ruleForm.startTime
				    }">
				  </el-time-select>
		   </el-form-item>	
		   
		   <!--说 如果 上传时 带了有文件，那么我们上传的类型
		   	只能是multipart/form-data
		   	multipart：多部件（）
		   	multer 多部件的接收器
		   -->
		 <!--  <form action="" enctype="multipart/form-data"></form>-->
		   
		   <!--
		   	upload上传
		   	action：动作，当选好一张图片后，就会触发这个动作，就开始这一次的请求
		   	:show-file-list 是否可以传多张图
		   	:on-success 当上传成功就会触发的自定义事件-》执行handleAvatarSuccess方法
		                                                                                           成功后返回结果要拿到（图片地址）
		   	:before-upload 在上传之前会触发的自定义事件-》执行beforeAvatarUpload方法
		   	                           上传之前一般会判断一下图片的类型和大小         
		   -->
		    <el-form-item label="上传店铺头像">
		    	<el-upload
				  class="avatar-uploader"
				  action="http://101.132.164.127:3000/addShop/photo"
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">
				  <!--有一张图，如果图片的地址存在，就显示它-->
				  <img v-if="imageUrl" :src="imageUrl" class="avatar">
				  <!--这个就是十字 图标 -->
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
		   </el-form-item>	
		   
		   
		   
		   <el-form-item label="优惠活动">
		   	   <el-select v-model="ruleForm.sale" placeholder="请选择" @change="saleAction">
			        <el-option label="满减优惠" value="满减优惠"></el-option>
			        <el-option label="优惠大酬宾" value="优惠大酬宾"></el-option>
			        <el-option label="新用户立减" value="新用户立减"></el-option>
			        <el-option label="进店领券" value="进店领券"></el-option>
			   </el-select>
		   </el-form-item>	
		   
		   <el-table
			    :data="ruleForm.saleList"
			    style="width: 100%">
				    <el-table-column
				      label="活动标题"
				      width="180"
				      prop="title">
				    </el-table-column>
			    
				    <el-table-column
				      label="活动详情"
				      width="280"
				      prop="info">
				    </el-table-column>
				  
				    <el-table-column label="操作">
				      <template slot-scope="scope">
				        <el-button
				          size="mini"
				          type="danger"
				          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				      </template>
				    </el-table-column>
			  </el-table>
			  
			   <el-form-item>
			   		<el-button type="primary" @click="onSubmit">立即创建</el-button>
			   </el-form-item>
		</el-form>
	</div>
</template>
<script>
export default {
	data(){
		return {
			imageUrl: '',
			ruleForm:{
				feature:{
					promise:true,
					express:true,
					newShop:true,
					takeOut:true,
					onTime:true,
					invoice:true
				},
				//表单中有每需要收集的数据，都写在这
				shopName:"",
				address:"",
				phone:"",
				info:"",
				slogan:"",
				category:"",
				sendPrice:1,
				startPrice:8,
				startTime:"",
				endTime:"",
				sale:"",
				saleList:[],
				shopPhoto:""
			},
			rules:{
				//表单中如果有 项目需要带验证规则的，规则写在这
				shopName:{required:true,message:"请输入店铺名称"},
				address:{required:true,message:"请输入详细地址"},
				phone:[
				   {required:true,message:"请输入联系电话"},
				   {type:'number',message:"必须是数字"}
//				   {min:7,max:11,message:"必须是7-11位"}
				]
			}
		}
	},
	methods: {
      handleAvatarSuccess(res, file) {
      	console.log(res) //文件名
      	this.ruleForm.shopPhoto = "http://101.132.164.127:3000/"+res
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      saleAction(title){
      	 console.log(title)
      	 this.$prompt('请输入活动详情', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.{10,}/,
          inputErrorMessage: '活动详情必须是10-50个字'
        }).then(({ value }) => {
            //要把数据写到下面的表格中
            var action = {title:title,info:value}
            this.ruleForm.saleList.push(action)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.ruleForm.saleList.splice(index,1)
      },
      onSubmit(){
      	  this.$refs.ruleForm.validate(async (vaild)=>{
      	  	 //vaild 验证全通过 vaild 就为true
      	  	 if(vaild){
      	  	 	console.log("1111")
      	  	 	 //把ruleFrom 上传给服务器
      	  	 	 var res = await this.$http.post("/addShop/uploadData",this.ruleForm)
      	  	 	 console.log(res)
      	  	 	 this.$router.push("/shopList")
      	  	 }else{
      	  	 	this.$message({
		            type: 'error',
		            message: '表单填写有误'
		          }); 
      	  	 }
      	  })
      }
    }
}
</script>

<style>
.addShop { width: 560px; margin-left: 180px;}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>