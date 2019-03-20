<template>
	<div class="addGoods">
		<el-form ref="form" :model="form" label-width="80px">
			 <el-form-item label="店铺名称">
   				 <el-input v-model="shopName" :disabled="true"></el-input>
 			 </el-form-item>
 			 
 			  <el-form-item label="食品分类">
   				 <el-select v-model="form.category" placeholder="请选择">
				        <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
				  </el-select>
				  <el-button type="primary" @click="addCategory()" size="mini" round>添加分类</el-button>
 			 </el-form-item>
 			 
 			 <el-form-item label="食品名称">
   				 <el-input v-model="form.foodName"></el-input>
 			 </el-form-item>
 			 
 			 <el-form-item label="食品活动">
   				 <el-input v-model="form.sale"></el-input>
 			 </el-form-item>
 			 
 			 <el-form-item label="食品详情">
   				 <el-input v-model="form.detail"></el-input>
 			 </el-form-item>
 			 
 			 <el-form-item label="上传食品图片">
   				 <el-upload
					  class="avatar-uploader"
					  action="http://101.132.164.127:3000/addGoods/upload"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="imageUrl" :src="imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
 			 </el-form-item>
 			 
 			  <el-form-item label="食品特点">
   				 <el-select v-model="form.style" placeholder="请选择">
				        <el-option  tabel="新品" value="新品" ></el-option>
				        <el-option  tabel="招牌" value="招牌" ></el-option>
				        <el-option  tabel="推荐" value="推荐" ></el-option>
				  </el-select>
 			 </el-form-item>
 			 
 			 <el-form-item label="食品规格">
 			 	<el-radio v-model="form.size" label="单规格">单规格 </el-radio>
  				<el-radio v-model="form.size" label="多规格">多规格</el-radio>
 			 </el-form-item>
 			 
 			 <div v-if="flag">
 			 	<el-form-item label="包装费">
   				    <el-input-number v-model.number="form.boxPrice" :min="0" :max="10"></el-input-number>
 				</el-form-item>
 				<el-form-item label="价格">
   				    <el-input-number v-model.number="form.price" :min="1"></el-input-number>
 				</el-form-item>
 			 </div>
 			  <div v-else>
 			 	 <el-button type="primary" @click="dialogFormVisible = true">添加规格</el-button>
 			 	 <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
				    
				     <el-form-item label="规格">
   						 <el-input v-model="form.sizeName"></el-input>
 					 </el-form-item>
 					 <el-form-item label="包装费">
   				     	<el-input-number v-model.number="form.boxPrice" :min="0" :max="10"></el-input-number>
 					 </el-form-item>
 					 <el-form-item label="价格">
   				    	<el-input-number v-model.number="form.price" :min="1"></el-input-number>
 					 </el-form-item>
				  <div slot="footer" class="dialog-footer">
				    <el-button @click="dialogFormVisible = false">取 消</el-button>
				    <el-button type="primary" @click="addSize()">确 定</el-button>
				  </div>
				</el-dialog>
				
				<el-table
			    :data="form.sizes"
			    style="width: 100%">
				    <el-table-column
				      label="规格"
				      prop="sizeName">
				    </el-table-column>
			    
				    <el-table-column
				      label="包装费"
				      prop="boxPrice">
				    </el-table-column>
				    
				  	<el-table-column
				      label="价格"
				      prop="price">
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
				
 			 </div>
 			 
 			 
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
			dialogFormVisible: false,
			imageUrl:"",
			options: [],
			shopName:this.$route.params.shopName,
			form:{
				id:this.$route.params.id,
				category:"",
				foodName:"",
				sale:"",
				detail:"",
				style:"",
				size:"单规格",
				boxPrice:1,
				price:1,
			    sizeName:"",
			    sizes:[],
			    photo:""
			}
		}
	},
	computed:{
		flag(){
			return this.form.size=="单规格"?true:false
		}
	},
	async created(){
		if(!this.$route.params.id){
			this.$alert('添加食品需要选择一个商铺，先去就去选择商铺吗？', '提示', {
	          confirmButtonText: '确定',
	          callback: action => {
	          	 this.$router.push("/shopList")
	          }
	        });
		}
		var res = await this.$http.get("/addGoods/category?shopId="+this.$route.params.id)
		console.log(res)
		if(res.data){
			this.options = res.data.categories
		}
	},
	methods:{
		addCategory(){
			this.$prompt('请输一个分类', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          inputPattern: /.{2,}/,
	          inputErrorMessage: '请输格式不正确'
	        }).then(async ({ value }) => {
	          this.options.push({
		          value: value,
		          label: value
		        })
	          var obj = {
	          	 shopId:this.$route.params.id,
	          	 oneCategory:{
		          value: value,
		          label: value
		        }
	          }
	          var res = await this.$http.post("/addGoods/category",obj)
	          console.log(res)
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '取消输入'
	          });       
	        });
		},
	   handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.form.photo = res
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
      addSize(){
      	this.dialogFormVisible = false;
      	this.form.sizes.push({
      		sizeName:this.form.sizeName,
      		boxPrice:this.form.boxPrice,
      		price:this.form.price
      	})
      	this.form.sizeName = "";
      	this.form.boxPrice = 1;
      	this.form.price = 1
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.form.sizes.splice(index,1)
      },
      async onSubmit(){
      	  var res = await this.$http.post("/addGoods",this.form)
      	  console.log(res)
      	  this.$router.push({name:'goodsList',params:{shopId:this.$route.params.id}})
      }
	}
}
</script>

<style>
.addGoods  { width: 560px; margin-left: 180px;}
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