<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>还款记录列表</el-breadcrumb-item>
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
      手机号：<el-input class="searchContent" placeholder="用户手机号" v-model="mobile" clearable></el-input>
      </el-col>
      <el-col :span="10" style="height: 55px;">
        <template>
          还款时间：
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
      <el-button type="primary" id="searchBtn" @click="searchContent()" slot="append" icon="el-icon-search">查询</el-button>
    </div>
    <template>
      <el-table
        ref="multipleTable"
        :data="tableData"
        @selection-change="handleSelectionChange"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="id"
          label="ID"
          width="110">
        </el-table-column>
        <el-table-column
          fixed
          prop="method"
          label="还款方式"
          :formatter="methodFormatter"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="还款通道"
          :formatter="genderFormatter"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          :formatter="statusFormatter"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="tranFlowId"
          label="交易流水号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="borrowingCapital"
          label="合同金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop="lagInterest"
          label="逾期费用"
          width="100">
        </el-table-column>
        <el-table-column
          prop="repaymentCapital"
          label="总费用"
          width="100">
        </el-table-column>
        <el-table-column
          prop="discountAmount"
          label="已减免金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop="paymentAmount"
          label="实际还款金额"
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
          prop="repaymentDefer"
          label="实际展期还款金额"
          width="110">
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
          prop="updateDate"
          label="更新时间"
          width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="offlineRepaymentTip(scope.row)" type="text" size="medium">详情</el-button>
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
    <!--线下还款结构-->
    <el-dialog
      title="线下还款"
      :visible.sync="centerDialogVisible1"
      width="40%"
      center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
        <el-form-item label="当前应还总金额:">
          <el-input v-model="ruleForm.shouldRepayment" disabled></el-input>
        </el-form-item>
        <el-form-item label="滞纳金+罚息:">
          <el-input v-model="ruleForm.interest" disabled></el-input>
        </el-form-item>
        <el-form-item label="减免金额:" prop="repaymentDiscountAmount">
          <el-input v-model="ruleForm.repaymentDiscountAmount"></el-input>
        </el-form-item>
        <el-form-item label="实际还款金额:" prop="repaymentPaymentAmount">
          <el-input v-model="ruleForm.repaymentPaymentAmount"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="offlineRepayment('ruleForm')">确认平账<i class="el-icon-check el-icon--right"></i></el-button>
          <el-button type="info"  @click="centerDialogVisible1 = false">取消<i class="el-icon-close el-icon--right"></i></el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--线上减免结构-->
    <el-dialog
      title="线上减免"
      :visible.sync="centerDialogVisible2"
      width="40%"
      center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
        <el-form-item label="当前应还总金额:" prop="shouldRepayment">
          <el-input v-model="ruleForm.shouldRepayment" disabled></el-input>
        </el-form-item>
        <el-form-item label="滞纳金+罚息:">
          <el-input v-model="ruleForm.interest" disabled></el-input>
        </el-form-item>
        <el-form-item label="减免金额:" prop="repaymentDiscountAmount">
          <el-input v-model="ruleForm.repaymentDiscountAmount"></el-input>
        </el-form-item>
        <el-form-item label="实际还款金额:" prop="repaymentPaymentAmount">
          <el-input v-model="ruleForm.repaymentPaymentAmount"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onlineRelief('ruleForm')">确认减免<i class="el-icon-check el-icon--right"></i></el-button>
          <el-button type="info"  @click="centerDialogVisible2 = false">取消<i class="el-icon-close el-icon--right"></i></el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--单独扣款结构-->
    <el-dialog
      title="单独扣款"
      :visible.sync="centerDialogVisible3"
      width="40%"
      center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
        <el-form-item label="当前应还总金额:" prop="shouldRepayment">
          <el-input v-model="ruleForm.shouldRepayment" disabled></el-input>
        </el-form-item>
        <el-form-item label="滞纳金+罚息:">
          <el-input v-model="ruleForm.interest" disabled></el-input>
        </el-form-item>
        <el-form-item label="减免金额:" prop="repaymentDiscountAmount">
          <el-input v-model="ruleForm.repaymentDiscountAmount"></el-input>
        </el-form-item>
        <el-form-item label="实际还款金额:" prop="repaymentPaymentAmount">
          <el-input v-model="ruleForm.repaymentPaymentAmount"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="separateDeduction('ruleForm')">保存<i class="el-icon-check el-icon--right"></i></el-button>
          <el-button type="info"  @click="centerDialogVisible3 = false">取消<i class="el-icon-close el-icon--right"></i></el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--展期还款结构-->
    <el-dialog
      title="展期还款"
      :visible.sync="centerDialogVisible4"
      width="40%"
      center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
        <el-form-item label="当前应还总金额:" prop="shouldRepayment">
          <el-input v-model="ruleForm.shouldRepayment" disabled></el-input>
        </el-form-item>
        <el-form-item label="展期应还金额:">
          <el-input v-model="ruleForm.repaymentDefer" disabled></el-input>
        </el-form-item>
        <el-form-item label="滞纳金+罚息:">
          <el-input v-model="ruleForm.interest" disabled></el-input>
        </el-form-item>
        <el-form-item label="展期减免金额:" prop="repaymentDiscountAmount">
          <el-input v-model="ruleForm.repaymentDiscountAmount"></el-input>
        </el-form-item>
        <el-form-item label="展期实际还款金额:" prop="repaymentPaymentAmount">
          <el-input v-model="ruleForm.repaymentPaymentAmount"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="separateDeduction('ruleForm')">保存<i class="el-icon-check el-icon--right"></i></el-button>
          <el-button type="info"  @click="centerDialogVisible4 = false">取消<i class="el-icon-close el-icon--right"></i></el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
        this.getProductList(this.pageNum,this.pageSize,this.productId,this.reBorrow,this.parentChannelName,this.childrenChannelName,
          this.sex,this.mobile,this.startDate,this.endDate,this.startDateLoan,this.endDateLoan);
      },
      //每页显示多少条
      handleSizeChange(val) {
        this.nowPageSizes=val;
        this.getProductList(this.pageNum,val,this.productId,this.reBorrow,this.parentChannelName,this.childrenChannelName,
          this.sex,this.mobile,this.startDate,this.endDate,this.startDateLoan,this.endDateLoan);
      },
      //翻页
      handleCurrentChange(val) {
        this.getProductList(val,this.nowPageSizes,this.productId,this.reBorrow,this.parentChannelName,this.childrenChannelName,
          this.sex,this.mobile,this.startDate,this.endDate,this.startDateLoan,this.endDateLoan);
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
       * @param data9 开始时间
       * @param data10 结束时间
       */
      getProductList(data1,data2,data3,data4,data5,data6,data7,data8,data9,data10){
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
            startDate: data9,
            endDate: data10,
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
      //线下还款弹窗
      offlineRepaymentTip(row){
        this.centerDialogVisible1=true;
        this.orderId=row.orderId;
        //计算逾期费用 + 罚息
        this.ruleForm.interest=row.repaymentOverdueFee + row.repaymentPenaltyInterest;
        //计算应还金额：还款本金 + 逾期费用 + 罚息
        this.ruleForm.shouldRepayment=row.repaymentCapital + row.repaymentOverdueFee + row.repaymentPenaltyInterest;
        //获取减免金额
        this.ruleForm.repaymentDiscountAmount=row.repaymentDiscountAmount;
        //计算实际还款金额
        this.ruleForm.repaymentPaymentAmount=this.ruleForm.shouldRepayment - this.ruleForm.repaymentDiscountAmount;
      },
      //线下还款
      offlineRepayment(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否确定平账?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              axios({
                method:"POST",
                url:"http://"+this.baseUrl+"/order/admin/borrowing/offlineRepayment",
                headers:{
                  'Content-Type':'application/json',
                  'Authorization': localStorage.token
                },
                params:{
                  orderId:this.orderId,
                  discountAmount:this.ruleForm.repaymentDiscountAmount,
                  paymentAmount: this.ruleForm.repaymentPaymentAmount,
                }
              }).then((res)=>{
                if(res.data.msgCd=='ZYCASH-200'){
                  this.centerDialogVisible1=false;
                  this.$message({
                    message: '操作成功',
                    type: 'success'
                  });
                  this.$router.push('/orderList');
                }else if(res.data.msgCd=='ZYCASH-1009'){
                  this.$message.error(res.data.msgInfo);
                }
                else {
                  this.$message.error(res);
                }
              })
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //线上减免弹窗
      onlineReliefTip(row){
        this.centerDialogVisible2=true;
        this.orderId=row.orderId;
        //计算逾期费用 + 罚息
        this.ruleForm.interest=row.repaymentOverdueFee + row.repaymentPenaltyInterest;
        //计算应还金额：还款本金 + 逾期费用 + 罚息
        this.ruleForm.shouldRepayment=row.repaymentCapital + row.repaymentOverdueFee + row.repaymentPenaltyInterest;
        //获取减免金额
        this.ruleForm.repaymentDiscountAmount=row.repaymentDiscountAmount;
        //计算实际还款金额
        this.ruleForm.repaymentPaymentAmount=this.ruleForm.shouldRepayment - this.ruleForm.repaymentDiscountAmount;
      },
      //线上减免
      onlineRelief(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否确定减免?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              axios({
                method:"POST",
                url:"http://"+this.baseUrl+"/order/admin/borrowing/onlineRelief",
                headers:{
                  'Content-Type':'application/json',
                  'Authorization': localStorage.token
                },
                params:{
                  orderId:this.orderId,
                  discountAmount:this.ruleForm.repaymentDiscountAmount,
                  paymentAmount: this.ruleForm.repaymentPaymentAmount,
                }
              }).then((res)=>{
                if(res.data.msgCd=='ZYCASH-200'){
                  this.centerDialogVisible2=false;
                  this.$message({
                    message: '操作成功',
                    type: 'success'
                  });
                  this.$router.push('/orderList');
                }else if(res.data.msgCd=='ZYCASH-1009'){
                  this.$message.error(res.data.msgInfo);
                }
                else {
                  this.$message.error(res);
                }
              })
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //单独扣款弹窗
      separateDeductionTip(row){
        this.centerDialogVisible3=true;
        this.orderId=row.orderId;
        //计算逾期费用 + 罚息
        this.ruleForm.interest=row.repaymentOverdueFee + row.repaymentPenaltyInterest;
        //计算应还金额：还款本金 + 逾期费用 + 罚息
        this.ruleForm.shouldRepayment=row.repaymentCapital + row.repaymentOverdueFee + row.repaymentPenaltyInterest;
        //获取减免金额
        this.ruleForm.repaymentDiscountAmount=row.repaymentDiscountAmount;
        //计算实际还款金额
        this.ruleForm.repaymentPaymentAmount=this.ruleForm.shouldRepayment - this.ruleForm.repaymentDiscountAmount;
      },
      //单独扣款
      separateDeduction(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否确定停用此催收员?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              axios({
                method:"POST",
                url:"http://"+this.baseUrl+"/order/admin/borrowing/separateDeduction",
                headers:{
                  'Content-Type':'application/json',
                  'Authorization': localStorage.token
                },
                params:{
                  orderId:this.orderId,
                  discountAmount:this.ruleForm.repaymentDiscountAmount,
                  paymentAmount: this.ruleForm.repaymentPaymentAmount,
                }
              }).then((res)=>{
                if(res.data.msgCd=='ZYCASH-200'){
                  this.centerDialogVisible3=false;
                  this.$message({
                    message: '操作成功',
                    type: 'success'
                  });
                  this.$router.push('/orderList');
                }else if(res.data.msgCd=='ZYCASH-1009'){
                  this.$message.error(res.data.msgInfo);
                }
                else {
                  this.$message.error(res);
                }
              })
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //展期还款弹窗
      lineDefferTip(row){
        this.centerDialogVisible4=true;
        this.orderId=row.orderId;
        //计算逾期费用 + 罚息
        this.ruleForm.interest=row.repaymentOverdueFee + row.repaymentPenaltyInterest;
        //计算应还金额：还款本金 + 逾期费用 + 罚息
        this.ruleForm.shouldRepayment=row.repaymentCapital + row.repaymentOverdueFee + row.repaymentPenaltyInterest;
        //获取减免金额
        this.ruleForm.repaymentDiscountAmount=row.repaymentDiscountAmount;
        //计算实际还款金额
        this.ruleForm.repaymentPaymentAmount=this.ruleForm.shouldRepayment - this.ruleForm.repaymentDiscountAmount;
      },
      //展期还款
      lineDeffer(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否确定展期还款?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              axios({
                method:"POST",
                url:"http://"+this.baseUrl+"/order/admin/borrowing/lineDeffer",
                headers:{
                  'Content-Type':'application/json',
                  'Authorization': localStorage.token
                },
                params:{
                  orderId:this.orderId,
                  discountAmount:this.ruleForm.repaymentDiscountAmount,
                  paymentAmount: this.ruleForm.repaymentPaymentAmount,
                }
              }).then((res)=>{
                if(res.data.msgCd=='ZYCASH-200'){
                  this.centerDialogVisible3=false;
                  this.$message({
                    message: '操作成功',
                    type: 'success'
                  });
                  this.$router.push('/orderList');
                }else if(res.data.msgCd=='ZYCASH-1009'){
                  this.$message.error(res.data.msgInfo);
                }
                else {
                  this.$message.error(res);
                }
              })
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      //审核订单
      detailProduct(){
        this.$router.push({
          path: `/editFinanceProduct`,
        });
      },
      //全选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //过滤还款方式字段
      methodFormatter(row){
        let method = row.method;
        if(method == 0){
          return '线下平账'
        } else if (method == 1){
          return '单独扣款'
        } else if (method == 2){
          return '线下展期平账'
        } else if (method == 3){
          return '线上展期扣款'
        } else if (method == 4){
          return '线下部分还款'
        } else if (method == 5){
          return '主动还款'
        } else if (method == 6){
          return 'APP线上展期'
        } else if (method == 7){
          return 'APP线上部分还款'
        } else if (method == 8){
          return '批扣'
        }
      },
      //过滤性别字段
      genderFormatter(row){
        return '合利宝'
      },
      //过滤状态字段
      statusFormatter(row){
        let status = row.status;
        if(status === 0){
          return '订单生成 '
        } else if (status === 1){
          return '付款交易进行中'
        } else if (status === 2){
          return '已完成'
        } else if (status === 3){
          return '已取消'
        } else if (status === 4){
          return '失败'
        }
      },
      //过滤用户标识字段
      reBorrowFormatter(row){
        let reBorrow = row.status;
        if(reBorrow === 0){
          return '新户'
        } else if (reBorrow === 1){
          return '老户'
        } else{
          return '---'
        }
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
      this.startDate=this.dateFormat(new Date(new Date().getFullYear(), new Date().getMonth()-1, new Date().getDate(), 0, 0, 0));
      this.endDate=this.dateFormat(new Date());
      this.value5=[this.startDate,this.endDate];
      this.getProduct();
      this.getProductList(1,30,null,null,null,null,null,null,this.startDate,this.endDate);
    },
    data() {
      //只能输入数字
      var validatorNumber = (rule, value, callback) => {
        if (!value) {
          callback(new Error('输入不能为空'));
        } else {
          if((/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/).test(value) == false){
            callback(new Error("请填写正整数"));
          }else{
            this.ruleForm.repaymentPaymentAmount=this.ruleForm.shouldRepayment - value;
            callback();
          }
        }
      };
      return {
        productList:[],
        reBorrowList: [
          {classifyId:null,classifyName:"全部状态"},
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
        reBorrow:null,
        parentChannelName:null,
        childrenChannelName:null,
        sex:null,
        mobile:null,
        value4:'',
        value5:'',
        startDate:null,
        endDate:null,
        startDateLoan:null,
        endDateLoan:null,
        centerDialogVisible1:false,
        centerDialogVisible2:false,
        centerDialogVisible3:false,
        centerDialogVisible4:false,
        centerDialogVisible5:false,
        orderId:null,
        ruleForm: {
          shouldRepayment:null,
          repaymentDefer:null,
          interest:null,
          repaymentDiscountAmount:null,
          repaymentPaymentAmount:null,
        },
        rules: {
          repaymentDiscountAmount: [
            { required: true, validator: validatorNumber, trigger: 'blur' }
          ],
          repaymentPaymentAmount: [
            { required: true, validator: this.validatorNumber, trigger: 'blur' }
          ]
        }
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
