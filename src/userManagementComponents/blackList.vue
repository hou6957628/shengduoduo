<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/blackList' }">黑名单列表</el-breadcrumb-item>
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
        <template>身份证号：
          <el-input class="searchContent" placeholder="用户身份证号" v-model="cardNumber" clearable></el-input>
        </template>
      </el-col>
      <el-col :span="6" style="height: 55px;">
        <template>主渠道：
          <el-input class="searchContent" placeholder="主渠道名称" v-model="channelName" clearable></el-input>
        </template>
      </el-col>
      <el-col :span="6" style="height: 55px;">
        <template>子渠道：
          <el-input class="searchContent" placeholder="子渠道名称" v-model="subChannelName" clearable></el-input>
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
      </template>
      <el-button id="searchBtn" @click="searchContent()" slot="append" icon="el-icon-search">查询</el-button>
      <el-button type="primary" id="blackBtn" @click="blackBtn()" slot="append" icon="">添加黑名单</el-button>
    </div>
    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="customerId"
          label="用户ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="realName"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="cardNumber"
          label="身份证号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="应用"
          width="120">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="注册时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="channelName"
          label="主渠道"
          width="120">
        </el-table-column>
        <el-table-column
          prop="subChannelName"
          label="子渠道"
          width="120">
        </el-table-column>
        <el-table-column
          prop="description"
          label="拉黑原因"
          width="120">
        </el-table-column>
        <el-table-column
          prop="updateDate"
          label="最近登录应用时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="isBlackList"
          label="是否是黑名单"
          width="110">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.isBlackList == true ? 'primary' : 'danger'"
              disable-transitions>{{scope.row.isBlackList == true ? '是' : '否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="overdueNumber"
          label="逾期次数"
          width="100">
        </el-table-column>
        <el-table-column
          prop="reBorrow"
          label="用户标识"
          width="80">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.reBorrow == true ? 'primary' : 'danger'"
              disable-transitions>{{scope.row.reBorrow == true ? '老户' : '新户'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button @click="detailProduct(scope.row)" type="text" size="small">详情</el-button>
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
        this.getProductList(1,20,this.realName,this.mobile,this.cardNumber,this.channelName,this.subChannelName,this.startTime,this.endTime);
      },
      //每页显示多少条
      handleSizeChange(val) {
        this.getProductList(this.pageNum,val,this.realName,this.mobile,this.cardNumber,this.channelName,this.subChannelName,this.startTime,this.endTime);
        this.nowPageSizes=val;
      },
      //翻页
      handleCurrentChange(val) {
        this.getProductList(val,this.nowPageSizes,this.realName,this.mobile,this.cardNumber,this.channelName,this.subChannelName,this.startTime,this.endTime);
      },
      //创建金融产品
      toAddProduct(){
        this.$router.push({
          path: `/editFinanceProduct`,
        });
      },
      /**
       * 获取黑名单列表
       * @param data1 查询第几页
       * @param data2 每页显示多少条数据
       * @param data3 用户姓名
       * @param data4 用户手机号
       * @param data5 身份证号
       * @param data6 主渠道
       * @param data7 子渠道
       * @param data8 开始时间
       * @param data9 结束时间
       */
      getProductList(data1,data2,data3,data4,data5,data6,data7,data8,data9){
        axios({
          method:"GET",
          url:"http://"+this.baseUrl+"/user_center/admin/black/list",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            pageNum:data1,
            pageSize:data2,
            realName: data3,
            mobile: data4,
            cardNumber: data5,
            channelName: data6,
            subChannelName: data7,
            startDate: data8,
            endDate: data9,
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
        this.getProductList(1,20,this.finProduct,this.finProduct);
      },
      //编辑产品接口
      editProduct(row){
        console.log(row.id);
        let id=row.id;
        this.$router.push({
          path: `/editFinanceProduct/${id}`,
        });
      },
      //详情接口
      detailProduct(row){
        let id=row.id;
        this.$router.push({
          path: `/editFinanceProduct/${id}`,
        });
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
    },
    mounted:function () {
      this.getProductList(1,20,null,null,null,null,null,null);
    },
    data() {
      return {
        tableData: [],
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
        realName:'',
        mobile:'',
        cardNumber:'',
        channelName:'',
        subChannelName:'',
        value7:'',
        startTime:'',
        endTime:'',
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
