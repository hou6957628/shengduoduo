<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/pendingLoan' }">待放款列表</el-breadcrumb-item>
      <el-breadcrumb-item>详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!--<div class="listContent">-->
      <!--<div class="listBox" v-for="(item,index) in productList" :class="isactive == index ? 'addclass' : ''" @click="fen(item,index)">{{item.productName}}</div>-->
    <!--</div>-->
    <div class="jiben">
      <h3>订单信息</h3>
      <!--<table>-->
        <!--<tr>-->
          <!--<td>订单号：{{this.borrowingForm.orderId}}</td>-->
          <!--<td>手机号：{{this.borrowingForm.mobile}}</td>-->
          <!--<td>渠道：{{this.borrowingForm.parentChannelName==null?'&#45;&#45;':this.borrowingForm.parentChannelName}}</td>-->
          <!--<td>订单状态：{{this.borrowingForm.status}}</td>-->
          <!--<td>新户老户：{{this.borrowingForm.reBorrow==true?'老户':'新户'}}</td>-->
          <!--<td>所属平台：{{this.borrowingForm.productName}}</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td>申请时间：{{this.borrowingForm.createDate}}</td>-->
          <!--<td>放款时间：{{this.borrowingForm.borrowingPaymentDate==null?'&#45;&#45;':this.borrowingForm.borrowingPaymentDate}}</td>-->
          <!--<td>预计还款时间：{{this.borrowingForm.repaymentEndDate}}</td>-->
          <!--<td>实际还款时间：{{this.borrowingForm.repaymentPaymentDate==null?'&#45;&#45;':this.borrowingForm.repaymentPaymentDate}}</td>-->
          <!--<td>借款金额：{{this.borrowingForm.borrowingCapital}}</td>-->
          <!--<td>期限：{{this.borrowingForm.borrowingPeriod}}</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td>是否逾期：{{this.borrowingForm.repaymentOverdueDay==null?'否':'是'}}</td>-->
          <!--<td>逾期天数：{{this.borrowingForm.repaymentOverdueDay}}</td>-->
          <!--<td>应还利息（元）：{{this.borrowingForm.repaymentOverdueFee}}</td>-->
          <!--<td>罚息（元）：{{this.borrowingForm.repaymentPenaltyInterest}}</td>-->
          <!--<td>滞纳金（元）：没有此字段</td>-->
          <!--<td>应还总还金额（元）：{{this.borrowingForm.repaymentOverdueFee + this.borrowingForm.repaymentPenaltyInterest}}</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td>是否可展期：{{this.borrowingForm.defer==1?'是':'否'}}</td>-->
          <!--<td>展期应还金额：{{this.borrowingForm.repaymentDefer}}</td>-->
          <!--<td>展期实际还款金额（元）：{{this.borrowingForm.repaymentDeferPayment}}</td>-->
          <!--<td>减免金额：{{this.borrowingForm.repaymentDiscountAmount}}</td>-->
          <!--<td>展期次数：没有此字段</td>-->
          <!--<td>还款方式：没有此字段</td>-->
        <!--</tr>-->
      <!--</table>-->
    </div>
    <el-button-group style="margin: 0 auto;width: 500px;display: block;margin-top: 40px;margin-bottom: 40px">
      <el-button class="la" type="danger" @click="batchAuditOrder('0')">同意</el-button>
      <el-button class="la" type="danger" @click="batchAuditOrder('1')">拒绝</el-button>
      <el-button class="la" type="danger" @click="resetForm()">关闭</el-button>
    </el-button-group>
    <div class="listContent">
      <!--<router-link :to="{name:'jiben',params: {cusCustomer: this.cusCustomer,idCard: this.idCard}}" tag="li">基本信息</router-link>-->
      <router-link :to="'/jibenOrder/'+this.id" tag="li">基本信息</router-link>
      <router-link :to="'/fenxianOrder/' + this.id" tag="li">风险命中列表</router-link>
      <router-link :to="'/yunyingOrder/' + this.id" tag="li">运营商通讯录比对</router-link>
      <a href="http://www.baidu.com" target="_blank" class="ddd">天机报告</a>
      <a href="http://www.baidu.com" target="_blank" class="ddd">支付宝报告</a>
      <router-link :to="'/yonghuOrder/' + this.id" tag="li">用户催收记录</router-link>
      <router-link :to="'/dingdanOrder/' + this.id" tag="li">订单记录</router-link>
      <router-link :to="'/fangkuanOrder/' + this.id" tag="li">放款记录</router-link>
      <router-link :to="'/huankuanOrder/' + this.id" tag="li">还款记录</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        borrowingForm:null,
        productList:[],
        zhimaFen:null,
        bankCard:[],
        cusCustomer:null,
        tianjiReport:null,
        idCard:null,
        idFace:null,
        linkMan:[],
        id:null,
        orderId:'',
        authorizationStatus:[],
        basicInfo:null,
        electData: [
          {key:0,Id:"全部产品"},
          {key:1,Id:"借点儿"},
          {key:2,Id:"夏花花"},
          {key:3,Id:"取消救济"},
        ],
        tableData:[],
        electValue:0,
        isactive:0,
      };
    },
    methods: {
      //审核订单
      batchAuditOrder(status){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/order/admin/pending/batchLoanOrder",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            orderIds: this.orderId,
            status: status,
            memo: null,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            this.$router.push('/pendingLoan');
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //取消按钮
      resetForm() {
        this.$router.push('/pendingApproval');
      },
      //用户基本信息
      getUserDetail(id) {
        axios({
          method: "POST",
          url:"http://"+this.baseUrl+"/user_center/admin/customer/find",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params: {
            id: id,
          }
        }).then((res) => {
          if (res.data.msgCd == 'ZYCASH-200') {
            this.productList = res.data.body.productList;
            this.zhimaFen = res.data.body.zhimaFen;
            this.bankCard = res.data.body.bankCard;
            this.cusCustomer = res.data.body.cusCustomer;
            this.tianjiReport = res.data.body.tianjiReport;
            this.idCard = res.data.body.idCard;
            this.idFace = res.data.body.idFace;
            this.linkMan = res.data.body.linkMan;
            this.authorizationStatus = res.data.body.authorizationStatus;
            this.basicInfo = res.data.body.basicInfo;
          } else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //下拉选择
      selectChange(row){
        console.log(this.electValue);
      },
      //用户订单信息
      // getOrderInfo(id) {
      //   axios({
      //     method: "POST",
      //     url:"http://"+this.baseUrl+"/order/admin/borrowing/info",
      //     headers: {
      //       'Content-Type': 'application/x-www-form-urlencoded',
      //       'Authorization': localStorage.token
      //     },
      //     params: {
      //       orderId: id,
      //     }
      //   }).then((res) => {
      //     if (res.data.msgCd == 'ZYCASH-200') {
      //       this.borrowingForm = res.data.body;
      //       let status = res.data.body.status;
      //       if(status==0){
      //         this.borrowingForm.status = '待机器审核 ';
      //       } else if (status === 1){
      //         this.borrowingForm.status = '机器审核中';
      //       } else if (status === 2){
      //         this.borrowingForm.status = '审核拒绝';
      //       } else if (status === 3){
      //         this.borrowingForm.status = '人工审核';
      //       } else if (status === 4){
      //         this.borrowingForm.status = '待放款';
      //       } else if (status === 5){
      //         this.borrowingForm.status = '放款中';
      //       } else if (status === 6){
      //         this.borrowingForm.status = '放款失败';
      //       } else if (status === 7){
      //         this.borrowingForm.status = '取消';
      //       } else if (status === 8){
      //         this.borrowingForm.status = '放款成功';
      //       } else if (status === 9){
      //         this.borrowingForm.status = '还款确认中';
      //       } else if (status === 10){
      //         this.borrowingForm.status = '正常还款 ';
      //       } else if (status === 11){
      //         this.borrowingForm.status = '逾期未还';
      //       } else if (status === 12){
      //         this.borrowingForm.status = '坏账';
      //       } else if (status === 13){
      //         this.borrowingForm.status = '逾期还款';
      //       }
      //     } else {
      //       this.$message.error(res.data.msgInfo);
      //     }
      //   })
      // },
    },
    mounted: function () {
      this.id=this.$route.params.id;
      this.orderId=this.$route.params.orderId;
      console.log(this.id);
      console.log(this.orderId);
      this.getUserDetail(this.id);
      // this.getOrderInfo(this.orderId);
    }
  }
</script>

<style scoped>
  .jiben{
    margin-top: 20px;
    font-size: 14px;
    margin-bottom: 40px;
  }
  .ddd{
    display: inline-block;
    padding: 10px 15px;
    margin-right: 10px;
    margin-left: 5px;
    font-size: 16px;
    color: #ffffff;
    background-color: #118efe;
    border: 1px solid #0f91ff;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
  }
  .ddd:hover{
    background-color: #0abcfe;
    border: 1px solid #0fbeff;
  }
  .listBox{
    display: inline-block;
    float: left;
    padding: 10px 20px;
    margin: 0 5px;
    font-size: 17px;
    color: #000;
    background-color: #dedede;
    border: 1px solid #b0b0b0;
    border-radius: 10px;
    cursor: pointer;
  }
  .content {
    padding-left: 200px;
    padding-top: 80px;
  }
  .listContent{
    clear: both;
    height: 80px;
  }
  .listContent li{
    display: inline-block;
    padding: 10px 15px;
    margin-right: 10px;
    margin-left: 5px;
    font-size: 16px;
    color: #ffffff;
    background-color: #118efe;
    border: 1px solid #0f91ff;
    border-radius: 5px;
    cursor: pointer;
  }
  .listContent li:hover{
    color: #ffffff;
    background-color: #0abcfe;
    border: 1px solid #0fbeff;
  }
  .fs-16 {
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .addclass{
    background-color: #118efe;
  }
  .la{
    padding: 15px 40px;
    font-size: 20px;
    text-align: center;
    margin: 0 auto;
  }
  .guan{
    padding: 15px 40px;
    font-size: 20px;
    text-align: center;
    margin-left: 40px;
  }
  table,table tr th, table tr td { border:1px solid #838383; }
  table { width: 95%; min-height: 40px; line-height: 40px; text-align: center; border-collapse: collapse; padding:10px 5px;margin-top: 20px}
</style>
