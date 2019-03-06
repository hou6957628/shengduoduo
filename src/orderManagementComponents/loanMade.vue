<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>已放款列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operationContent">
      <el-col :span="6" style="height: 55px;">
        产品：
        <el-select v-model="productId" placeholder="请选择">
          <el-option
            v-for="item in productList"
            :key="item.productId"
            :label="item.productName"
            :value="item.productId">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" style="height: 55px;">
        状态：
        <el-select v-model="status" placeholder="请选择">
          <el-option
            v-for="item in electData1"
            :key="item.id"
            :label="item.classifyName"
            :value="item.classifyId">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" style="height: 55px;">
        新老户：
        <el-select v-model="reBorrow" placeholder="请选择">
          <el-option
            v-for="item in reBorrowList"
            :key="item.id"
            :label="item.classifyName"
            :value="item.classifyId">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" style="height: 55px;">
        主渠道：<el-input class="searchContent" placeholder="主渠道" v-model="parentChannelName" clearable></el-input>
      </el-col>
      <el-col :span="6" style="height: 55px;">
        子渠道：<el-input class="searchContent" placeholder="子渠道" v-model="childrenChannelName" clearable></el-input>
      </el-col>
      <el-col :span="6" style="height: 55px;">
        性别：<el-select v-model="sex" placeholder="请选择">
          <el-option
            v-for="item in sexList"
            :key="item.id"
            :label="item.classifyName"
            :value="item.classifyId">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" style="height: 55px;">
      手机号：<el-input class="searchContent" placeholder="用户手机号" v-model="mobile" clearable></el-input>
      </el-col>
      <el-col :span="6" style="height: 55px;">
        用户姓名：<el-input class="searchContent" placeholder="用户姓名" v-model="cusName" clearable></el-input>
      </el-col>
      <el-col :span="10" style="height: 55px;">
        <template>
          申请时间：
          <el-date-picker style="margin-left: 0px"
                          v-model="value4"
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
        </template>
      </el-col>
      <el-col :span="10" style="height: 55px;">
        <template>
          放款时间：
          <el-date-picker style="margin-left: 0px"
                          v-model="value5"
                          type="datetimerange"
                          align="right"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :picker-options="pickerOptions2"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          @change="logTimeChange2()">
          </el-date-picker>
        </template>
      </el-col>
      <el-button type="primary" id="searchBtn" @click="searchContent()" slot="append" icon="el-icon-search">查询</el-button>
    </div>
    <template>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        style="width: 98%">
        <el-table-column
          fixed
          prop="orderId"
          label="订单ID"
          width="250">
        </el-table-column>
        <el-table-column
          fixed
          prop="name"
          label="姓名"
          min-width="80">
        </el-table-column>
        <el-table-column
          fixed
          prop="gender"
          label="性别"
          :formatter="genderFormatter"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="borrowingPeriod"
          label="借款期限"
          width="100">
        </el-table-column>
        <el-table-column
          prop="borrowingCapital"
          label="借款金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop="status"
          label="订单状态"
          :formatter="statusFormatter"
          width="150">
        </el-table-column>
        <el-table-column
          prop="borrowingInterest"
          label="综合费用"
          width="100">
        </el-table-column>
        <el-table-column
          prop="borrowingPaymentAmount"
          label="到账金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop="repaymentOverdueDay"
          label="逾期天数"
          width="100">
        </el-table-column>
        <el-table-column
          prop="repaymentOverdueFee"
          label="逾期费用"
          width="100">
        </el-table-column>
        <el-table-column
          prop="repaymentPenaltyInterest"
          label="罚息"
          width="100">
        </el-table-column>
        <el-table-column
          prop="repaymentCapital"
          label="应还金额"
          :formatter="shouldFormatter"
          width="100">
        </el-table-column>
        <el-table-column
          prop="repaymentPaymentAmount"
          label="实际还款金额"
          width="110">
        </el-table-column>
        <el-table-column
          prop="repaymentDiscountAmount"
          label="已减免金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop="defer"
          label="是否展期"
          width="100">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.defer == 1 ? 'primary' : 'danger'"
              disable-transitions>{{scope.row.defer == 1 ? '是' : '否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="repaymentDefer"
          label="展期应还金额"
          width="110">
        </el-table-column>
        <el-table-column
          prop="repaymentDeferPayment"
          label="实际展期还款金额"
          width="110">
        </el-table-column>
        <el-table-column
          prop="partial"
          label="是否部分还款"
          width="100">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.partial == 1 ? 'primary' : 'danger'"
              disable-transitions>{{scope.row.partial == 1 ? '是' : '否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="partialRepayment"
          label="部分还款应还金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop="partialUnpaidAmount"
          label="剩余还款金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="应用"
          width="100">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="申请时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="borrowingPaymentDate"
          label="放款时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="repaymentEndDate"
          label="应还款日期"
          width="200">
        </el-table-column>
        <el-table-column
          prop="repaymentPaymentDate"
          label="实际还款时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="parentChannelName"
          label="主渠道"
          width="120">
        </el-table-column>
        <el-table-column
          prop="childrenChannelName"
          label="子渠道"
          width="120">
        </el-table-column>
        <el-table-column
          prop="reBorrow"
          label="用户标识"
          :formatter="reBorrowFormatter"
          width="120">
        </el-table-column>
        <el-table-column
          prop="collectorName"
          label="催收员"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
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
  </div>
</template>


<script>
  import axios from 'axios'
  export default {
    methods: {
      //查询所有产品
      getProduct() {
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/order/admin/borrowing/getProductList",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.productList=res.data.body;
            this.productList.unshift({productId: null, productName: '全部产品'});
          }else if(res.data.msgCd=='ZYCASH-1009'){
            this.$message.error(res.data.msgInfo);
          }
          else {
            this.$message.error(res);
          }
        })
      },
      //条件查询列表
      searchContent(data){
        if (status == null) {
          this.getProductList(this.pageNum,this.pageSize,this.productId,this.reBorrow,this.parentChannelName,this.childrenChannelName,
            this.sex,this.mobile,this.startDate,this.endDate,this.startDateLoan,this.endDateLoan,this.status,8,this.cusName);
        } else {
          this.getProductList(this.pageNum,this.pageSize,this.productId,this.reBorrow,this.parentChannelName,this.childrenChannelName,
            this.sex,this.mobile,this.startDate,this.endDate,this.startDateLoan,this.endDateLoan,this.status,null,this.cusName);
        }
      },
      //每页显示多少条
      handleSizeChange(val) {
        this.nowPageSizes=val;
        if (status == null) {
          this.getProductList(this.pageNum,val,this.productId,this.reBorrow,this.parentChannelName,this.childrenChannelName,
            this.sex,this.mobile,this.startDate,this.endDate,this.startDateLoan,this.endDateLoan,this.status,8,this.cusName);
        } else {
          this.getProductList(this.pageNum,val,this.productId,this.reBorrow,this.parentChannelName,this.childrenChannelName,
            this.sex,this.mobile,this.startDate,this.endDate,this.startDateLoan,this.endDateLoan,this.status,null,this.cusName);
        }
      },
      //翻页
      handleCurrentChange(val) {
        if (status == null) {
          this.getProductList(val,this.nowPageSizes,this.productId,this.reBorrow,this.parentChannelName,this.childrenChannelName,
            this.sex,this.mobile,this.startDate,this.endDate,this.startDateLoan,this.endDateLoan,this.status,8,this.cusName);
        } else {
          this.getProductList(val,this.nowPageSizes,this.productId,this.reBorrow,this.parentChannelName,this.childrenChannelName,
            this.sex,this.mobile,this.startDate,this.endDate,this.startDateLoan,this.endDateLoan,this.status,null,this.cusName);
        }
      },
      /**
       * 获取待放款订单列表
       * @param data1 查询第几页
       * @param data2 每页显示多少条数据
       * @param data3 产品id
       * @param data4 新老户
       * @param data5 主渠道名称
       * @param data6 子渠道名称
       * @param data7 性别
       * @param data8 手机号
       * @param data9 申请开始时间
       * @param data10 申请结束时间
       * @param data11 放款开始时间
       * @param data12 放款结束时间
       * @param data13 订单具体状态
       * @param data14 放款状态
       * @param data15 用户姓名
       */
      getProductList(data1,data2,data3,data4,data5,data6,data7,data8,data9,data10,data11,data12,data13,data14,data15){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/order/admin/borrowing/list",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            pageNum:data1,
            pageSize:data2,
            productId: data3,
            reBorrow: data4,
            parentChannelName: data5,
            childrenChannelName: data6,
            gender: data7,
            mobile: data8,
            name: data15,
            startDate: data9,
            endDate: data10,
            startDateLoan: data11,
            endDateLoan: data12,
            status: data13,
            statusGeq:data14,
            sortColumn: 'create_date',
            direction: 'desc',
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
      //详情
      detailProduct(row){
        let id=row.customerId;
        let orderId=row.orderId;
        let status=row.status;
        if (status == 10 || status == 13) {
          this.$router.push({
            path: `/orderDetailPaymentHistory/${id}/${orderId}`,
          });
        } else {
          this.$router.push({
            path: `/orderDetailLoanMade/${id}/${orderId}`,
          });
        }
      },
      //过滤性别字段
      genderFormatter(row){
        let gender = row.gender;
        if(gender == false){
          return '男'
        } else if (gender == true){
          return '女'
        } else {
          return '未知'
        }
      },
      //过滤状态字段
      statusFormatter(row){
        let status = row.status;
        if(status === 0){
          return '待机器审核 '
        } else if (status === 1){
          return '机器审核中'
        } else if (status === 2){
          return '审核拒绝'
        } else if (status === 3){
          return '人工审核'
        } else if (status === 4){
          return '待放款'
        } else if (status === 5){
          return '放款中'
        } else if (status === 6){
          return '放款失败'
        } else if (status === 7){
          return '取消'
        } else if (status === 8){
          return '放款成功，待还款'
        } else if (status === 9){
          return '还款确认中'
        } else if (status === 10){
          return '正常还款 '
        } else if (status === 11){
          return '逾期未还'
        } else if (status === 12){
          return '坏账'
        } else if (status === 13){
          return '逾期还款'
        }
      },
      //过滤用户标识字段
      reBorrowFormatter(row){
        let reBorrow = row.reBorrow;
        if(reBorrow == false){
          return '新户'
        } else if (reBorrow == true){
          return '老户'
        } else{
          return '---'
        }
      },
      //应还金额字段
      shouldFormatter(row){
        let repaymentCapital = row.repaymentCapital;
        let repaymentOverdueFee = row.repaymentOverdueFee;
        let repaymentPenaltyInterest = row.repaymentPenaltyInterest;
        return repaymentCapital + repaymentOverdueFee + repaymentPenaltyInterest;
      },
      //申请时间筛选
      logTimeChange(){
        if(this.value4==''||this.value4==null){
          this.startDate=null;
          this.endDate=null;
        }else {
          var startTime=this.value4[0];
          var endTime=this.value4[1];
          this.startDate=startTime;
          this.endDate=endTime;
        }
      },
      //放款时间筛选
      logTimeChange2(){
        if(this.value5==''||this.value5==null){
          this.startDateLoan=null;
          this.endDateLoan=null;
        }else {
          var startTime=this.value5[0];
          var endTime=this.value5[1];
          this.startDateLoan=startTime;
          this.endDateLoan=endTime;
        }
      },
    },
    mounted:function () {
      this.startDateLoan=this.dateFormatCustom(new Date(new Date().getFullYear(), new Date().getMonth()-1, new Date().getDate(), 0, 0, 0));
      this.endDateLoan=this.dateFormatCustom(new Date());
      this.value5=[this.startDateLoan,this.endDateLoan];
      this.getProduct();
      this.getProductList(1,30,null,null,null,null,null,null,null,null,this.startDateLoan,this.endDateLoan,null,8,null);
    },
    data() {
      return {
        productList:[],
        electData1: [
          {classifyId:null,classifyName:"全部状态"},
          {classifyId:8,classifyName:"放款成功，待还款"},
          {classifyId:9,classifyName:"还款确认中"},
          {classifyId:10,classifyName:"正常还款 "},
          {classifyId:11,classifyName:"逾期未还"},
          {classifyId:12,classifyName:"坏账"},
          {classifyId:13,classifyName:"逾期已还"},
        ],
        reBorrowList: [
          {classifyId:null,classifyName:"全部"},
          {classifyId:0,classifyName:"新户"},
          {classifyId:1,classifyName:"老户"},
        ],
        sexList: [
          {classifyId:null,classifyName:"全部"},
          {classifyId:0,classifyName:"男"},
          {classifyId:1,classifyName:"女"},
        ],
        tableData:[],
        pageNum: null,
        proTotal:null,
        pageSize:null,
        pageSizes:[20,30,50],
        nowPageSizes:20,
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
        productId:null,
        status:null,
        reBorrow:null,
        parentChannelName:null,
        childrenChannelName:null,
        sex:null,
        mobile:null,
        cusName:null,
        value4:'',
        value5:'',
        startDate:null,
        endDate:null,
        startDateLoan:null,
        endDateLoan:null,
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
    margin-left:0px;
    width: 200px;
    margin-right: 30px;
  }
  .paginationBox{
    margin-top: 20px;
    font-size: 18px;
    margin-bottom: 40px;
  }
</style>
