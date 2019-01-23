<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/roleList' }">角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operationContent">
      <el-button class="upLoadBtn" @click="toAddProduct()" type="primary">创建角色<i class="el-icon-upload el-icon-circle-plus"></i></el-button>
    </div>
    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="roleCode"
          label="角色ID"
          width="150">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="description"
          label="角色说明"
          width="150">
        </el-table-column>
        <el-table-column
          prop="authorities"
          label="角色权限"
          width="300"
          :formatter="getAuto"
        >
        </el-table-column>
        <el-table-column
          prop="enabled"
          label="状态"
          width="80">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.enabled == true ? 'primary' : 'danger'"
              disable-transitions>{{scope.row.enabled == true ? '启用' : '停用'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="updateDate"
          label="更新时间"
          width="200">
        </el-table-column>

        <el-table-column
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button @click="editProduct(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-if="scope.row.enabled" @click="obtainedProduct(scope.row)" type="text" size="small">停用</el-button>
            <el-button v-if="!scope.row.enabled" @click="obtainedProduct(scope.row)" type="text" size="small">启用</el-button>
            <el-button @click="deleteProduct(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="block">
      <el-pagination class="paginationBox"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :unique-opened="true"
        :current-page="pageNum"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="proTotal">
      </el-pagination>
    </div>
  </div>
</template>


<script>
  import axios from 'axios'
  export default {
    methods: {
      //每页显示多少条
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.getProductList(this.pageNum,val);
        this.nowPageSizes=val;
      },
      //翻页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        console.log(this.nowPageSizes);
        this.getProductList(val,this.nowPageSizes);
      },
      //创建角色
      toAddProduct(){
        this.$router.push({
          path: `/addRole`,
        });
      },
      /**
       * 获取金融产品列表
       * @param data1 查询第几页
       * @param data2 每页显示多少条数据
       * @param data3 产品名称
       * @param data4 产品编号
       */
      getProductList(data1,data2,data3,data4){
        axios({
          method:"POST",
          // url:"http://"+this.baseUrl+"/operate/admin/Product/list",
          url:"http://"+this.baseUrl+"/operate/admin/role/list",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            pageNum: data1,
            pageSize: data2,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.tableData=res.data.body.list;
            this.proTotal=res.data.body.total;
            this.pageSize=res.data.body.pageSize;
            this.pageNum=res.data.body.pageNum;
            console.log(this.tableData);
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //编辑产品接口
      editProduct(row){
        console.log(row.roleId);
        var id=row.roleId;
        this.$router.push({
          path: `/editRole/${id}`,
        });
      },
      //删除产品接口
      deleteProduct(row){
        axios({
          method:"post",
          // url:"http://"+this.baseUrl+"/super/admin/product/obtainedProduct",
          url:"http://"+this.baseUrl+"/operate/admin/role/edit",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            roleCode: row.roleCode,
            deltetTag: true,
            enabled: row.enabled,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            this.getProductList(1,30);
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //停用产品接口
      obtainedProduct(row){
        axios({
          method:"post",
          url:"http://"+this.baseUrl+"/operate/admin/product/delOrStopProduct",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            roleCode: row.roleCode,
            deltetTag: false,
            enabled: !row.enabled,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            this.getProductList(1,30);
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //过滤类型字段
      getAuto(row,column){
        var roleName=[];
        for(var i=0;i<row.authorities.length;i++){
          roleName.push(row.authorities[i].authorityName)
        }
        return roleName.join(" ");

      },
    },
    mounted:function () {
      // this.finProduct=this.$route.params.name;
      this.getProductList(1,30);
    },
    data() {
      return {
        tableData: [],
        finProduct: '',
        pageNum: null,
        proTotal:null,
        pageSize:null,
        pageSizes:[30,40,50],
        nowPageSizes:30,
      }
    }
  }
</script>

<style scoped>
  .select{
    margin-left: 20px;
  }
  .content {
    padding-left: 200px;
    padding-top: 80px;
  }
  .fs-16{
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .operationContent{
    text-align: left;
    margin: 25px 30px 15px 0;
  }
  .operationContent .upLoadBtn{

  }
  .operationContent .searchContent{
    margin-left: 20px;
    width: 300px;
    margin-right: 30px;
  }
  .paginationBox{
    margin-top: 20px;
    font-size: 18px;
    margin-bottom: 40px;
  }
</style>
