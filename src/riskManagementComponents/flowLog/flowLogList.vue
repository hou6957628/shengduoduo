<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>风控命中列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operationContent">
      <el-col :span="6">
        <el-input placeholder="请输入姓名" clearable v-model="cusName">
          <template slot="prepend">姓名</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入手机号" clearable v-model="mobile">
          <template slot="prepend">手机号</template>
        </el-input>
      </el-col>
      <el-button id="searchBtn" @click="searchContent()" slot="append" icon="el-icon-search">查询</el-button>
    </div>
    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="id"
          label="ID"
          width="150">
        </el-table-column>
        <el-table-column
          prop="cusName"
          label="姓名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="itemCode"
          label="风险编号"
          width="300">
        </el-table-column>
        <el-table-column
          prop="itemName"
          label="类型"
          width="100">
        </el-table-column>
        <el-table-column
          prop="memo"
          label="触发内容"
          width="300">
        </el-table-column>
        <el-table-column
          prop="value"
          label="取值"
          width="150">
        </el-table-column>
        <el-table-column
          prop="result"
          label="结果"
          width="100">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.result == 1 ? 'primary' : 'danger'"
              disable-transitions>{{scope.row.result == 0 ? '拒绝' : '通过'}}</el-tag>
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
        <!--<el-table-column-->
          <!--label="操作"-->
          <!--width="220">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button @click="editProduct(scope.row)" type="text" size="small">编辑</el-button>-->
            <!--<el-button @click="deleteProduct(scope.row)" type="text" size="small">删除</el-button>-->
            <!--<el-button v-if="scope.row.enabled" @click="obtainedProduct(scope.row)" type="text" size="small">停用</el-button>-->
            <!--<el-button v-if="!scope.row.enabled" @click="obtainedCustomerTag(scope.row)" type="text" size="small">启用</el-button>-->
            <!--<el-button @click="copyProduct(scope.row)" type="text" size="small">复制</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
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
      //条件查询规则集列表
      searchContent(){
        this.getProductList(1,20,this.cusName,this.mobile);
      },
      //每页显示多少条
      handleSizeChange(val) {
        this.getProductList(this.pageNum,val,this.finProduct,this.finProduct);
        this.nowPageSizes=val;
      },
      //翻页
      handleCurrentChange(val) {
        this.getProductList(val,this.nowPageSizes,this.finProduct,this.finProduct);
      },
      /**
       * 用户标签列表接口
       * @param data1 查询第几页
       * @param data2 每页显示多少条数据
       * @param data3 标签名称
       * @param data4 分类名称
       */
      getProductList(data1,data2,data3,data4){
        axios({
          method:"GET",
          url:"http://"+this.baseUrl+"/risk/admin/flow_log/list",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            pageNum: data1,
            pageSize: data2,
            cusName: data3,
            mobile: data4,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.tableData=res.data.body.list;
            this.proTotal=res.data.body.total;
            this.pageSize=res.data.body.pageSize;
            this.pageNum=res.data.body.pageNum;
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //查询产品接口
      searchProduct(){
        this.getProductList(1,20,this.finProduct,this.finProduct,null);
      },
      //提示删除规则接口
      deleteProduct(row){
        axios({
          method:"post",
          url:"http://"+this.baseUrl+"/risk/admin/rule_collection/checkRef",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            id: row.id,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            if (res.data.body.count != 0) {
              this.$alert('该规则集已被规则流程引用，不可删除', '提示', {
                confirmButtonText: '确定',
                center: true,
                type: 'warning'
              });
            } else {
              this.$confirm('是否确认删除此规则集?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
              }).then(() => {
                this.deleteCustomerTag(row);
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
            }
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //确认删除规则接口
      deleteCustomerTag(row){
        axios({
          method:"post",
          url:"http://"+this.baseUrl+"/risk/admin/rule_collection/deleteOrStop",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            id: row.id,
            status: 1,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getProductList(1,20,null,null);
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
    },
    mounted:function () {
      this.getProductList(1,20,null,null);
    },
    data() {
      return {
        electData: [ ],
        tableData:[],
        electValue:null,
        cusName: '',
        mobile: '',
        pageNum: null,
        proTotal:null,
        pageSize:null,
        pageSizes:[20,30,50],
        nowPageSizes:20,
        centerDialogVisible:false,
        electDataEnabled: [
          {key:1,Id:'启用'},
          {key:0,Id:'不启用'},
        ],
      }
    }
  }
</script>

<style scoped>
  el-input {
    width: 130px;
    margin-bottom: 5px;
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
