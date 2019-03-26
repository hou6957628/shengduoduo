<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>渠道链接列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operationContent">
      <el-button class="upLoadBtn" @click="toAddProduct()" type="primary">添加渠道&nbsp;&nbsp;<i class="el-icon-upload el-icon-circle-plus"></i></el-button>
      <el-input class="searchContent" placeholder="主渠道名称或子渠道名称" v-model="channel" clearable>
        <el-button id="searchBtn" @click="searchContent(channel)" slot="append" icon="el-icon-search">查询</el-button>
      </el-input>
      <el-select v-model="ruleForm.productId" placeholder="请选择产品" @change="selectChange()">
        <el-option
          v-for="item in electData"
          :key="item.productId"
          :label="item.productName"
          :value="item.productId">
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
          width="80">
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
            <el-button @click="editProduct(scope.row)" type="text" size="medium">编辑</el-button>
            <el-button v-if="scope.row.enable" @click="obtainedProductTip(scope.row)" type="text" size="medium">停用</el-button>
            <el-button v-if="!scope.row.enable" @click="obtainedProduct(scope.row)" type="text" size="medium">启用</el-button>
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
      searchContent(){
        this.getProductList(1,10,this.channel,this.ruleForm.productId);
      },
      //每页显示多少条
      handleSizeChange(val) {
        this.getProductList(this.pageNum,val,this.channel,this.ruleForm.productId);
      },
      //翻页
      handleCurrentChange(val) {
        this.getProductList(val,this.nowPageSizes,this.channel,this.ruleForm.productId);
      },
      //添加渠道
      toAddProduct(){
        this.$router.push({
          path: `/addChannel`,
        });
      },
      /**
       * 获取渠道列表
       * @param data1 查询第几页
       * @param data2 每页显示多少条数据
       * @param data3 主渠道名称或者子渠道名称
       * @param data4 产品id
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
            productId: data4,
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
        var id=row.id;
        this.$router.push({
          path: `/editChannel/${id}`,
        });
      },
      // 停用弹窗
      obtainedProductTip(row){
        this.$confirm('是否确定停用此渠道?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.obtainedProduct(row);
        })
      },
      //停用产品接口
      obtainedProduct(row){
        axios({
          method:"post",
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
            this.getProductList(1,10,this.channel,this.ruleForm.productId);
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //下拉选择
      selectChange(){
        this.getProductList(1,10,this.channel,this.ruleForm.productId);
      },
    },
    mounted:function () {
       this.getProductList(1,10,null,null);
    },
    data() {
      return {
        tableData: [],
        channel: '',
        pageNum: null,
        proTotal:null,
        pageSize:null,
        pageSizes:[10,20,30],
        nowPageSizes:10,
        electData: [],
        ruleForm: {
          id: '',
          parentChannelName: '',
          subChannelName: '',
          longUrl: '',
          cpaPrice: '',
          cpsPrice: '',
          productId: '',
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
