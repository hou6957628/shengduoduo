<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/messageConfigurationList' }">消息配置</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operationContent">
      <el-select v-model="ruleForm.productName" placeholder="请选择产品" @change="selectChange($event,electData)">
        <el-option
          v-for="item in electData"
          :key="item.productCode"
          :label="item.productName"
          :value="item.productCode">
        </el-option>
      </el-select>
      <el-select v-model="ruleForm.productName" placeholder="请选择形式" @change="selectChange1($event,electData1)">
        <el-option
          v-for="item in electData1"
          :key="item.productCode"
          :label="item.productName"
          :value="item.productCode">
        </el-option>
      </el-select>
      <el-select v-model="ruleForm.productName" placeholder="请选择分类" @change="selectChange2($event,electData2)">
        <el-option
          v-for="item in electData2"
          :key="item.productCode"
          :label="item.productName"
          :value="item.productCode">
        </el-option>
      </el-select>
      <template>
        申请时间：
        <el-date-picker style="margin-left: 0px;margin-right: 15px;"
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
                        @change="logTimeChange()">
        </el-date-picker>
      </template>
      <el-input style="width: 350px;" class="searchContent"
                placeholder="输入名称或ID"
                v-model="finProduct"
                clearable>
        <el-button id="searchBtn" @click="searchContent(finProduct)" slot="append" icon="el-icon-search">查询</el-button>
      </el-input>
    </div>
    <template>
      <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        border
        style="width: 98%">
        <el-table-column
          fixed
          prop="id"
          label="ID"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="所属APP"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="消息名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="消息名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="消息分类"
          width="200">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="备注"
          width="300">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="120">
        </el-table-column>
        <el-table-column
          prop="time"
          label="执行时间"
          width="200">
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
        this.getProductList(this.pageNum,this.pageSize,this.productId,this.reBorrow,this.parentChannelName,this.childrenChannelName,
          this.sex,this.mobile,this.startDate,this.endDate);
      },
      //每页显示多少条
      handleSizeChange(val) {
        this.nowPageSizes=val;
        this.getProductList(this.pageNum,val,this.productId,this.reBorrow,this.parentChannelName,this.childrenChannelName,
          this.sex,this.mobile,this.startDate,this.endDate);
      },
      //翻页
      handleCurrentChange(val) {
        this.getProductList(val,this.nowPageSizes,this.productId,this.reBorrow,this.parentChannelName,this.childrenChannelName,
          this.sex,this.mobile,this.startDate,this.endDate);
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
          url:"http://"+this.baseUrl+"/order/admin/pending/list",
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
      //审核订单
      detailProduct(){
        this.$router.push({
          path: `/editFinanceProduct`,
        });
      },
      //下拉选择
      selectChange(vId,list) {
        let obj = {};
        obj = list.find((item) => {
          console.log(item.productName === vId);
          return item.productName === vId;
        });
        this.getProductList(1,30,null,null);
      },
      //下拉选择
      selectChange1(vId,list) {
        let obj = {};
        obj = list.find((item) => {
          console.log(item.productName === vId);
          return item.productName === vId;
        });
        this.getProductList(1,30,null,null);
      },
      //下拉选择
      selectChange2(vId,list) {
        let obj = {};
        obj = list.find((item) => {
          console.log(item.productName === vId);
          return item.productName === vId;
        });
        this.getProductList(1,30,null,null);
      },
      //分类列表
      toMessageClassify(){
        this.$router.push({
          path: `/messageClassify`,
        });
      },
      //全选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //时间筛选
      logTimeChange(){
        if(this.value5==''||this.value5==null){
          this.startDate=null;
          this.endDate=null;
        }else {
          var startTime=this.value5[0];
          var endTime=this.value5[1];
          this.startTime=startTime;
          this.endTime=endTime;
        }
      },
      //提示删除分类接口
      deleteProduct(row){
        axios({
          method:"get",
          url:"http://"+this.baseUrl+"/risk/admin/classification/getRuleByClassId",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            id: row.id,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            if (res.data.body != 0) {
              this.$alert('该规则分类已被规则引用，不可删除', '提示', {
                confirmButtonText: '确定',
                center: true,
                type: 'warning'
              });
            } else {
              this.$confirm('是否确认删除此规则分类?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
              }).then(() => {
                this.deleteClassification(row);
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
      //确认删除分类接口
      deleteClassification(row){
        axios({
          method:"post",
          url:"http://"+this.baseUrl+"/risk/admin/classification/delete",
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
            this.getProductList(1,10,1,null);
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //复制接口
      copeProduct(row){
        axios({
          method:"post",
          url:"http://"+this.baseUrl+"/risk/admin/classification/delete",
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
            this.getProductList(1,10,1,null);
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
    },
    mounted:function () {
      this.startDate=this.dateFormatCustom(new Date(new Date().getFullYear(), new Date().getMonth()-1, new Date().getDate(), 0, 0, 0));
      this.endDate=this.dateFormatCustom(new Date());
      this.value5=[this.startDate,this.endDate];
      this.getProduct();
      this.getProductList(1,30,null,null,null,null,null,null,this.startDate,this.endDate);
    },
    data() {
      return {
        productList:[],
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
        finProduct:null,
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
        value5:'',
        startDate:null,
        endDate:null,
        electData: [
          {productCode:1,productName:"启用"},
          {productCode:0,productName:"停用"},
        ],
        electData1: [
          {productCode:1,productName:"启用1"},
          {productCode:0,productName:"停用1"},
        ],
        electData2: [
          {productCode:1,productName:"启用2"},
          {productCode:0,productName:"停用2"},
        ],
      }
    }
  }
</script>

<style scoped>
  .searchContent{
    width: 200px;
  }
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
    margin-right: 15px;
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
