<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>账户中心</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operationContent">
      <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增账户</el-button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;渠道：
      <el-select v-model="productId" multiple placeholder="请选择">
        <el-option
          v-for="item in productList"
          :key="item.productId"
          :label="item.productName"
          :value="item.productId">
        </el-option>
      </el-select>
        <el-input style="width: 300px"
                  placeholder="输入渠道名称或链接"
                  v-model="proName"
                  clearable>
        </el-input>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary" icon="el-icon-search" @click="searchContent">搜索</el-button>
    </div>
    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="name"
          label="渠道编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="渠道名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="income"
          label="对应产品"
          width="150">
        </el-table-column>
        <el-table-column
          prop="balance"
          label="时间"
          width="160">
        </el-table-column>
        <el-table-column
          prop="balance"
          label="总消耗"
          width="120">
        </el-table-column>
        <el-table-column
          prop="balance"
          label="余额"
          width="120">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="300">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="recharge(scope.row)" type="text" size="medium">充值</el-button>
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
    <!--新增账户结构-->
    <el-dialog title="新增账户" :visible.sync="dialogFormVisible" width="40%" center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="账户名称" prop="accountName">
          <el-input v-model="accountName" autocomplete="off" placeholder="填写账户名称"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="remark" autocomplete="off" placeholder="填写备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addProduct('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    methods: {
      //条件查询
      searchContent(){
        if(data==""){
          this.getProductList(1,10,null,this.electValue);
        }else {
          this.getProductList(1,10,data,this.electValue);
          console.log(data);
        }
      },
      //每页显示多少条
      handleSizeChange(val) {
        this.getProductList(this.pageNum,val,null,this.electValue);
        this.nowPageSizes=val;
      },
      //翻页
      handleCurrentChange(val) {
        this.getProductList(val,this.nowPageSizes,null,this.electValue);
      },
      /**
       * 查询账户列表
       * @param data1 查询第几页
       * @param data2 每页显示多少条数据
       * @param data3 渠道id集合
       * @param data4 渠道名称或链接
       */
      getProductList(data1,data2,data3,data4){
        axios({
          method:"post",
          url:"http://"+this.baseUrl+"/super/admin/account/list",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            pageNum: data1,
            pageSize: data2,
            channelIds: data3,
            channelName: data4,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-SUPERMARKET-200'){
            this.tableData=res.data.body.list;
            this.proTotal=res.data.body.total;
            this.pageSize=res.data.body.pageSize;
            this.pageNum=res.data.body.pageNum;
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //添加账户
      addProduct(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios({
              method: "post",
              url: "http://" + this.baseUrl + "/super/admin/account/addAccount",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.token
              },
              params: {
                accountName: this.ruleForm.accountName,
                description: this.ruleForm.description,
              }
            }).then((res) => {
              if (res.data.msgCd == 'ZYCASH-SUPERMARKET-200') {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.dialogFormVisible = false;
                this.getProductList(1, 10);
              } else {
                this.$message.error(res.data.msgInfo);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      recharge(row){
        let id = row.id;
        this.$router.push({path: `/rechargeCenter/${id}`});
      }
    },
    mounted:function () {
      this.getProductList(1,20,null,null);
    },
    data() {
      return {
        tableData: [],
        pageNum: null,
        proTotal:null,
        pageSize:null,
        pageSizes:[10,30,50],
        nowPageSizes:10,
        proName: '',
        accountName: '',
        remark: '',
        dialogFormVisible:false,
        ruleForm: {
          accountName: '',
          description: '',
        },
        rules: {
          accountName: [
            {required: true, message: '请输入账户名称', trigger: 'blur'},
          ],
        },
      }
    }
  }
</script>

<style scoped>
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
  .dsp{
    display: inline-block;
    margin-left: 40px;
  }
  .block span{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    letter-spacing: 1px;
  }
</style>
