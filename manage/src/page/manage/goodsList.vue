<template>
	<div>
		<el-table
    :data="tableData5"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="包装费">
            <span>{{ props.row.boxPrice }}</span>
          </el-form-item>
          <el-form-item label="详细信息">
            <span>{{ props.row.detail }}</span>
          </el-form-item>
          <el-form-item label="价格">
            <span>{{ props.row.price }}</span>
          </el-form-item>
          <el-form-item label="优惠活动">
            <span>{{ props.row.sale }}</span>
          </el-form-item>
          <el-form-item label="规格">
            <span>{{ props.row.size }}</span>
          </el-form-item>
          <el-form-item label="特点">
            <span>{{ props.row.style }}</span>
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
      prop="foodName">
    </el-table-column>
    
    <el-table-column
      label="分类"
      prop="category">
    </el-table-column>
    
    
     <el-table-column label="操作" width="180px">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="editGoods(scope.$index, scope.row)">编辑</el-button>
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
    	console.log(this.$route.params.shopId)
    	var res = await this.$http.get("/addGoods?shopId="+this.$route.params.shopId)
    	console.log(res)
    	this.tableData5 = res.data
    },
    methods:{
    	removeGoods(index,row){
		        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.tableData5.splice(index,1)
		          var res = this.$http.delete("addGoods?foodId="+row._id)
		          console.log(res)
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
		      },
		      editGoods(index,row){
		      	this.$router.push({name:"editGoods",params:{row}})
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