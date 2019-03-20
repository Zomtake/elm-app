<template>
	<div>
		<el-table
		    :data="tableData"
		    style="width: 100%">
		    
		    <el-table-column
		      type="index"
		      :index="indexMethod">
		    </el-table-column>
		    
		    <el-table-column
		      prop="userName"
		      label="姓名"
		      width="180">
		    </el-table-column>
		    
		    <el-table-column
		      prop="createTime"
		      label="日期"
		      width="240">
		    </el-table-column>
		    
		 
		    <el-table-column
		      prop="city"
		      label="地址">
		    </el-table-column>
		    
		    
		    <el-table-column label="操作">
			      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
			      </template>
   			 </el-table-column>
		  </el-table>
		  <el-pagination
		  	  @current-change="pageChange"
			  background
			  layout="total,prev, pager, next,jumper"
			  :total="total"
			  :page-size="4"> 
			  <!--page-size每一页显示几条-->
			</el-pagination>
	</div>
</template>
<script>
  export default {
    data() {
      return {
        tableData:[],
        pageNumber:1,
        total:0
      }},
    async created(){
    	this.requestData()
    	
    	var total = await this.$http.get("/adminList/count");
    	console.log(total)
    	this.total = total.data
    },
    methods: {
      pageChange(pageNumber){
      	//pageNumber 页码 是 组件内传给我们的，我们就可以直载获取到这个页码
      	 // alert(pageNumber) // 1 2 3
      	  this.pageNumber = pageNumber;
      	  this.requestData()
      },
      async requestData(){
      	var res = await this.$http.get("/adminList?pageNumber="+this.pageNumber)
      	console.log(res)
      	this.tableData = res.data
      },
      indexMethod(index) {
        return index + 1;
      },
       handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  };
</script>
<style>
</style>