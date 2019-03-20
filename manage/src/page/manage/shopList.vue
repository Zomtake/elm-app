<template>
	<div>
		<el-table
    :data="tableData5"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商店地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="店铺分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="营业时间">
            <span>{{ props.row.startTime }}</span>
          </el-form-item>
          <el-form-item label="打烊时间">
            <span>{{ props.row.endTime }}</span>
          </el-form-item>
          <el-form-item label="联系电话">
            <span>{{ props.row.phone }}</span>
          </el-form-item>
          <el-form-item label="配送价">
            <span>{{ props.row.sendPrice }}</span>
          </el-form-item>
          <el-form-item label="起送价">
            <span>{{ props.row.startPrice }}</span>
          </el-form-item>
          <el-form-item label="店铺标语">
            <span>{{ props.row.slogan }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    
    <el-table-column
      label="商品 ID"
      prop="_id">
    </el-table-column>
    
    <el-table-column
      label="商品名称"
      prop="shopName">
    </el-table-column>
    
    <el-table-column
      label="描述"
      prop="info">
    </el-table-column>
    
    
     <el-table-column label="操作" width="120px">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="addGoods(scope.$index, scope.row)">添加商品</el-button>
          <el-button
          size="mini"
          type="danger"
          @click="removeGoods(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    
  </el-table>
	</div>
</template>

<script>
export default {
    data() {
      return {
        tableData5: []
      }
    },
    async created(){
    	var res = await this.$http.get("/shopList")
    	console.log(res)
    	this.tableData5 = res.data
    },
    methods:{
    	addGoods(index,row){
    		console.log(index,row)
    		this.$router.push({name:"addGoods",params:{id:row._id,shopName:row.shopName}})
    	},
    	removeGoods(index,row){
		        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.tableData5.splice(index,1)
		          var res = this.$http.delete("shopList?foodId="+row._id)
		          console.log(res)
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
		      }
    }
  }
</script>

<style>
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>