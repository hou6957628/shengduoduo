<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/bankCardManagement' }">银行卡管理列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operationContent">
      <el-col :span="6" style="height: 55px;">
        <template>姓名：
          <el-input class="searchContent" placeholder="用户姓名" v-model="realName" clearable> </el-input>
        </template>
      </el-col>
      <el-col :span="6" style="height: 55px;">
        <template>手机号：
          <el-input class="searchContent" placeholder="用户手机号" v-model="mobile" clearable></el-input>
        </template>
      </el-col>
      <el-col :span="6" style="height: 55px;">
        <template>银行卡号：
          <el-input class="searchContent" placeholder="银行卡号" v-model="cardNumber" clearable></el-input>
        </template>
      </el-col>
      <el-col :span="6" style="height: 55px;">
        <template>身份证号：
          <el-input class="searchContent" placeholder="身份证号" v-model="idcardNum" clearable></el-input>
        </template>
      </el-col>
      <template>
        时间筛选:
        <el-date-picker style="margin-left: 25px"
                        v-model="value7"
                        type="datetimerange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        @change="logTimeChange()">
        </el-date-picker>
      </template>&nbsp;&nbsp;&nbsp;
      <el-button id="searchBtn" type="primary" @click="searchContent()" slot="append" icon="el-icon-search">查询</el-button>
      <el-button type="primary" @click="batchDelCount()" slot="append" icon="el-icon-delete">批量删除</el-button>
    </div>
    <template>
      <el-table
        ref="multipleTable"
        :data="tableData"
        @selection-change="handleSelectionChange"
        border
        highlight-current-row
        style="width: 98%">
        <el-table-column
          type="selection"
          label="批量"
          width="55">
        </el-table-column>
        <el-table-column
          fixed
          prop="bankId"
          label="银行卡ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="registerMobile"
          label="手机号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="type==0?'储蓄卡':'信用卡'"
          label="类型"
          width="100">
          <template slot-scope="scope">
            <el-tag disable-transitions>{{scope.row.type == 0 ? '储蓄卡' : '信用卡'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="productName"
          label="应用"
          width="120">
        </el-table-column>
        <el-table-column
          prop="cardNumber"
          label="银行卡号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="预留手机号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="idcardNum"
          label="身份证号"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button @click="editProduct(scope.row)" type="text" size="medium">删除</el-button>
            <el-button @click="detailProduct(scope.row)" type="text" size="medium">详情</el-button>
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
    <!--删除-->
    <el-dialog
      title="是否删除银行卡？"
      :visible.sync="centerDialogVisible1"
      width="20%"
      center>
      <el-form ref="ruleForm" label-width="60px" class="demo-ruleForm">
        <el-form-item>
          <el-button type="primary" @click="deleteBankCard">确认<i class="el-icon-check el-icon--right"></i></el-button>
          <el-button type="info"  @click="centerDialogVisible1 = false">取消<i class="el-icon-close el-icon--right"></i></el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--批量删除银行卡-->
    <el-dialog
      title="是否批量删除银行卡？"
      :visible.sync="centerDialogVisible"
      width="20%"
      center>
      <el-form ref="ruleForm" label-width="60px" class="demo-ruleForm">
        <el-form-item>
          <el-button type="primary" @click="batchDelTip">确认<i class="el-icon-check el-icon--right"></i></el-button>
          <el-button type="info"  @click="centerDialogVisible = false">取消<i class="el-icon-close el-icon--right"></i></el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
  import axios from 'axios'
  export default {
    methods: {
      //根据产品查询
      selectChange() {
        this.getProductList(1,30,this.realName,this.mobile,this.idcardNum,this.cardNumber,this.bankName,this.startTime,this.endTime);
      },
      //查询金融产品
      searchContent(data){
        this.getProductList(1,30,this.realName,this.mobile,this.idcardNum,this.cardNumber,this.bankName,this.startTime,this.endTime);
      },
      //每页显示多少条
      handleSizeChange(val) {
        this.getProductList(this.pageNum,val,this.realName,this.mobile,this.idcardNum,this.cardNumber,this.bankName,this.startTime,this.endTime);
        this.nowPageSizes=val;
      },
      //翻页
      handleCurrentChange(val) {
        this.getProductList(val,this.nowPageSizes,this.realName,this.mobile,this.idcardNum,this.cardNumber,this.bankName,this.startTime,this.endTime);
      },
      /**
       * 获取金融产品列表
       * @param data1 查询第几页
       * @param data2 每页显示多少条数据
       * @param data3 用户姓名 realName
       * @param data4 手机号 mobile
       * @param data5 身份证号 idcardNum
       * @param data6 银行卡号 cardNumber
       * @param data7 开户行名称 bankName
       * @param data8 开始时间
       * @param data9 结束时间
       */
      getProductList(data1,data2,data3,data4,data5,data6,data7,data8,data9){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/flowPool/admin/bank/getBankCardInfoByParams",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
          },
          params:{
            pageNum:data1,
            pageSize:data2,
            userName: data3,
            mobile: data4,
            idcardNum: data5,
            cardNumber: data6,
            bankName: data7,
            startTime: data8,
            endTime: data9,
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
      //单独删除银行卡提示
      editProduct(row){
        this.centerDialogVisible=true;
        this.$store.dispatch('setProhobit',row);
      },
      //确认单独删除银行卡接口
      deleteBankCard(id){
        let bankId=this.$store.state.prohobit.id;
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/flowPool/admin/bank/deleteBankCardInfo",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
          },
          params:{
            id:bankId,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.centerDialogVisible=false;
            this.getProductList(1,30,null,null,null,null,null,null);
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //批量删除银行卡弹出层
      batchDelCount(){
        this.centerDialogVisible=true;
      },
      //批量删除银行卡提示
      batchDelTip(row){
        if (this.customerId == null) {
          this.$message({
            showClose: true,
            message: '请至少选择一条记录',
            type: 'warning'
          });
        } else {
          this.batchDel();
        }
      },
      //确认批量删除银行卡接口
      batchDel(){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/flowPool/admin/bank/batchDeleteBankCard",
          headers:{
            'Content-Type':'application/json',
            'Authorization': this.$store.state.userToken
          },
          data:JSON.stringify(this.ids),
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.centerDialogVisible1=false;
            this.getProductList(1,30,null,null,null,null,null,null);
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //详情接口
      detailProduct(row){
        let id=row.id;
        this.$store.dispatch('setBankCard',id);
        this.$router.push({
          path: `/bankCardDetail`,
        });
      },
      //时间筛选
      logTimeChange(){
        if(this.value7!='' && this.value7!=null){
          var startTime=this.value7[0];
          var endTime=this.value7[1];
          this.startTime=startTime;
          this.endTime=endTime;
        } else {
          this.startTime='';
          this.endTime='';
        }
      },
      //全选
      handleSelectionChange(val) {
        this.multipleSelection = val;
        let ids = []
        this.multipleSelection.map((item)=> {
          ids.push(item.id);
        })
        this.ids = ids;
        if (this.multipleSelection.length == 0) {
          this.customerId = null;
        } else {
          this.customerId = this.multipleSelection[0].customerId;
        }
      },
    },
    mounted:function () {
      this.getProductList(1,30);
    },
    data() {
      return {
        centerDialogVisible1:false,
        centerDialogVisible:false,
        productListData: [],
        productId:null,
        tableData: [],
        pageNum: null,
        proTotal:null,
        pageSize:null,
        pageSizes:[20,30,50],
        nowPageSizes:30,
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        realName:'',
        mobile:'',
        cardNumber:'',
        idcardNum:'',
        bankName:'',
        value7:'',
        startTime:'',
        endTime:'',
        ids:[],
        customerId:null,
        electData: [
          {key:"中国工商银行",Id:"中国工商银行"},
          {key:"中国银行",Id:"中国银行"},
          {key:"中国建设银行",Id:"中国建设银行"},
          {key:"广发银行",Id:"广发银行"},
          {key:"交通银行",Id:"交通银行"},
          {key:"中国邮政储蓄银行",Id:"中国邮政储蓄银行"},
          {key:"中信银行",Id:"中信银行"},
          {key:"中国光大银行",Id:"中国光大银行"},
          {key:"兴业银行",Id:"兴业银行"},
          {key:"平安银行",Id:"平安银行"},
          {key:"浦发银行",Id:"浦发银行"},
        ],
      }
    }
  }
</script>

<style scoped>
  .el-col-8{
    height: 55px;
  }
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
    margin-left:5px;
    width: 200px;
    margin-right: 30px;
  }
  .paginationBox{
    margin-top: 20px;
    font-size: 18px;
    margin-bottom: 40px;
  }
</style>
