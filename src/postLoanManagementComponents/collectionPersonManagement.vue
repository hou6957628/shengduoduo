<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/collectionPersonManagement' }">催收人员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operationContent">
      <el-button class="upLoadBtn" @click="toAddProduct()" type="primary">添加人员<i class="el-icon-upload el-icon-circle-plus"></i></el-button>
      <el-input class="searchContent"
        placeholder="催收员姓名或手机号"
        v-model="finProduct"
        clearable>
        <el-button id="searchBtn" @click="searchContent(finProduct)" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-select v-model="electValue" placeholder="请选择" @change="selectChange">
        <el-option
          v-for="item in operationGroupList"
          :key="item.id"
          :label="item.groupName"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="id"
          label="编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="账号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="operationGroup.groupName"
          label="所属群组"
          width="150">
        </el-table-column>
        <el-table-column
          prop="role.roleName"
          label="群组角色"
          width="150">
        </el-table-column>
        <el-table-column
          prop="products.productName"
          label="产品选择"
          width="150">
        </el-table-column>
        <el-table-column
          prop="remark1"
          label="备注"
          width="120">
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
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button @click="editProduct(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-if="scope.row.enabled" @click="obtainedProduct(scope.row)" type="text" size="small">停用</el-button>
            <el-button v-if="!scope.row.enabled" @click="obtainedProduct(scope.row)" type="text" size="small">启用</el-button>
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
      //查询金融产品
      searchContent(data){
        if(data==""){
          this.getProductList(1,30,null,null);
          // this.$message.error('搜索内容不可以为空');
        }else {
          this.getProductList(1,30,this.finProduct,this.electValue);
          console.log(this.finProduct,this.electValue);
        }
      },
      //每页显示多少条
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.getProductList(this.pageNum,val,this.finProduct,this.electValue);
        this.nowPageSizes=val;
      },
      //翻页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        console.log(this.nowPageSizes);
        this.getProductList(val,this.nowPageSizes,this.finProduct,this.electValue);
      },
      //创建金融产品
      toAddProduct(){
        this.$router.push({
          path: `/collectionPerson`,
        });
      },
      /**
       * 获取催收人员管理列表
       * @param data1 查询第几页
       * @param data2 每页显示多少条数据
       * @param data3 催收员姓名或者手机号
       * @param data4 群组id
       */
      getProductList(data1,data2,data3,data4){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/operate/admin/collection/list",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            pageNum: data1,
            pageSize: data2,
            condition: data3,
            groupId: data4,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.tableData=res.data.body.list;
            this.proTotal=res.data.body.total;
            this.pageSize=res.data.body.pageSize;
            this.pageNum=res.data.body.pageNum;
            this.operationGroupList=res.data.body.operationGroupList;
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //编辑产品接口
      editProduct(row){
        var id=row.id;
        this.$router.push({
          path: `/editCollectionPerson/${id}`,
        });
      },
      //删除产品接口
      deleteProduct(row){
        axios({
          method:"post",
          // url:"http://"+this.baseUrl+"/super/admin/product/obtainedProduct",
          url:"http://"+this.baseUrl+"/operate/admin/product/delOrStopProduct",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            id: row.id,
            status: 1,
            enabled: row.enabled,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-SUPERMARKET-200'){
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            this.getProductList(1,10,this.finProduct,this.finProduct);
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //停用产品接口
      obtainedProduct(row){
        axios({
          method:"post",
          url:"http://"+this.baseUrl+"/operate/admin/collection/update",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            id: row.id,
            enabled: !row.enabled,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            this.getProductList(1,30,this.finProduct,this.data4);
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //过滤类型字段
      typeFormatter(row){
        let status = row.type;
        if(status === 0){
          return '信贷产品'
        } else {
          return '分期产品'
        }
      },
      //下拉选择
      selectChange(row){
        this.getProductList(1,30,this.finProduct,this.electValue);
        console.log(this.electValue);
      },
    },
    mounted:function () {
      // this.finProduct=this.$route.params.name;
      this.getProductList(1,30,null,null);
    },
    data() {
      return {
        operationGroupList: [
          {id:null,groupName:"全部群组"},
        ],
        electValue:null,
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
