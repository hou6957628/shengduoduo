<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/channelconnectionManagement' }">渠道连接管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operationContent">
      <el-button class="upLoadBtn" @click="toAddProduct()" type="primary">添加渠道&nbsp;&nbsp;<i class="el-icon-upload el-icon-circle-plus"></i></el-button>
      <el-input class="searchContent" @change="chan(channel)"
                placeholder="主渠道名称或子渠道名称"
                v-model="channel"
                clearable>
        <el-button id="searchBtn" @click="searchContent(channel)" slot="append" icon="el-icon-search">查询</el-button>
      </el-input>
      <el-select v-model="ruleForm.productName" placeholder="请选择" @change="selectChange($event,electData)">
        <el-option
          v-for="item in electData"
          :key="item.productCode"
          :label="item.productName"
          :value="item.productCode">
        </el-option>
      </el-select>
    </div>
    <template>
      <el-table
        :data="tableData"
        border
        highlight-current-row
        style="width: 98%">
        <el-table-column
          fixed
          prop="id"
          label="渠道编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="parentChannelName"
          label="主渠道名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="subChannelName"
          label="子渠道名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="所属应用"
          width="120">
        </el-table-column>
        <el-table-column
          prop="longUrl"
          label="长链接"
          width="500">
        </el-table-column>
        <el-table-column
          prop="cpaPrice"
          label="cpa单价"
          width="100">
        </el-table-column>
        <el-table-column
          prop="cpsPrice"
          label="cps单价"
          width="100">
        </el-table-column>
        <el-table-column
          prop="enable"
          label="状态"
          width="80">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.enable == true ? 'primary' : 'danger'"
              disable-transitions>{{scope.row.enable == true ? '启用' : '停用'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button @click="editProduct(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-if="scope.row.enable" @click="obtainedProduct(scope.row)" type="text" size="small">停用</el-button>
            <el-button v-if="!scope.row.enable" @click="obtainedProduct(scope.row)" type="text" size="small">启用</el-button>
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
          this.getProductList(1,20,data,this.ruleForm.productName);
        }
      },
      //每页显示多少条
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.getProductList(this.pageNum,val,this.channel,this.ruleForm.productName);
        this.nowPageSizes=val;
      },
      //翻页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        console.log(this.nowPageSizes);
        this.getProductList(val,this.nowPageSizes,this.channel,this.ruleForm.productName);
      },
      //添加渠道
      toAddProduct(){
        this.$router.push({
          path: `/addChannel`,
        });
      },
      //非空判断
      chan(data){
        if(data==''|data==null){
          this.getProductList(1,30)
        }
      },
      /**
       * 获取渠道列表
       * @param data1 查询第几页
       * @param data2 每页显示多少条数据
       * @param data3 渠道名称 或者子渠道名称
       * @param data4 产品名称
       */
      getProductList(data1,data2,data3,data4){
        axios({
          method:"get",
          url:"http://"+this.baseUrl+"/channel/admin/channel/list",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            pageNum: data1,
            pageSize: data2,
            channelName: data3,
            productName: data4,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.tableData=res.data.body.channelList;
            this.electData=res.data.body.productList;
            this.proTotal=res.data.body.total;
            this.pageSize=res.data.body.pageSize;
            this.pageNum=res.data.body.pageNum;
          }else {
            this.$message.error(res.data.body.msgInfo);
          }
        })
      },
      //编辑渠道接口
      editProduct(row){
        console.log(row.id);
        var id=row.id;
        this.$router.push({
          path: `/childrenChannelDetail/${id}`,
        });
      },
      //停用产品接口
      obtainedProduct(row){
        axios({
          method:"post",
          // url:"http://"+this.baseUrl+"/channel/admin/channel/update",
          url:"http://"+this.baseUrl+"/channel/admin/channel/update",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            id: row.id,
            enable: !row.enable,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            this.getProductList(1,30,this.channel,this.ruleForm.productName);
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
      selectChange(vId,list){
        let obj = {};
        obj = list.find((item)=>{
          console.log(item.productName === vId);
          return item.productName === vId;
        });
        console.log(vId);
        this.getProductList(1,30,null,null);
        // console.log(this.ruleForm.productName);
      },
    },
    mounted:function () {
       this.getProductList(1,30);
    },
    data() {
      return {
        tableData: [],
        channel: '',
        pageNum: null,
        proTotal:null,
        pageSize:null,
        pageSizes:[30,40,50],
        nowPageSizes:30,
        electData: [],
        ruleForm: {
          id: '',
          parentChannelName: '',
          subChannelName: '',
          longUrl: '',
          cpaPrice: '',
          cpsPrice: '',
          productName: '',
          productCode: '',
        },
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
