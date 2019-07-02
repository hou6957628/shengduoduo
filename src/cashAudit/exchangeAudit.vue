<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>兑换审核</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operationContent">
      <!--<el-col :span="6" style="height: 55px;">-->
        <!--<template>姓名：-->
          <!--<el-input class="searchContent" placeholder="用户姓名" v-model="realName" clearable> </el-input>-->
        <!--</template>-->
      <!--</el-col>-->
      <el-col :span="6" style="height: 55px;">
        <template>手机号：
          <el-input class="searchContent" placeholder="用户手机号" v-model="mobile" clearable></el-input>
        </template>
      </el-col>
      <el-col :span="6" style="height: 55px;">
        <template>奖品ID：
          <el-input class="searchContent" placeholder="奖品ID" v-model="priceId" clearable></el-input>
        </template>
      </el-col>
      <!--<el-col :span="6" style="height: 55px;">-->
        <!--<template>子渠道：-->
          <!--<el-input class="searchContent" placeholder="子渠道名称" v-model="subChannelName" clearable></el-input>-->
        <!--</template>-->
      <!--</el-col>-->
      <!--<template>-->
        <!--时间筛选:-->
        <!--<el-date-picker style="margin-left: 25px"-->
                        <!--v-model="value7"-->
                        <!--type="datetimerange"-->
                        <!--align="right"-->
                        <!--unlink-panels-->
                        <!--range-separator="至"-->
                        <!--start-placeholder="开始日期"-->
                        <!--end-placeholder="结束日期"-->
                        <!--:picker-options="pickerOptions2"-->
                        <!--format="yyyy-MM-dd HH:mm:ss"-->
                        <!--value-format="yyyy-MM-dd HH:mm:ss"-->
                        <!--@change="logTimeChange()">-->
        <!--</el-date-picker>-->
      <!--</template>&nbsp;&nbsp;-->
      <el-button id="searchBtn" type="primary" @click="searchContent()" slot="append" icon="el-icon-search">查询</el-button>
    </div>
    <template>
      <el-table
        :data="tableData"
        border
        highlight-current-row
        style="width:98%">
        <el-table-column
          fixed
          prop="id"
          align="center"
          label="用户ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="申请时间"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="priceTitle"
          label="兑换产品"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="收件人姓名"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="收件手机号"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="收件地址"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="订单状态"
          align="center"
          :formatter="longUrlFormatter"
          width="80">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="200">
          <template slot-scope="scope">
            <el-button @click="sendProduct(scope.row)" type="text" size="medium">发货</el-button>
            <el-button @click="detailProduct(scope.row)" type="text" size="medium">详情</el-button>
            <el-button @click="prohibitBtn(scope.row)" type="text" size="medium">禁用</el-button>
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
      //根据产品查询
      selectChange() {
        this.getProductList(1,20,this.mobile,this.priceId);
      },
      //条件查询
      searchContent(){
        this.getProductList(1,20,this.mobile,this.priceId);
      },
      //每页显示多少条
      handleSizeChange(val) {
        this.getProductList(this.pageNum,val,this.mobile,this.priceId);
        this.nowPageSizes=val;
      },
      //翻页
      handleCurrentChange(val) {
        this.getProductList(val,this.nowPageSizes,this.mobile,this.priceId);
      },
      /**
       * 获取金融产品列表
       * @param data1 查询第几页
       * @param data2 每页显示多少条数据
       * @param data3 手机号
       * @param data4 渠道号
       */
      getProductList(data1,data2,data3,data4){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/flowPool/admin/prizes/rewardsAuditList",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
          },
          params:{
            pageNum:data1,
            pageSize:data2,
            mobile: data3,
            id: data4,
            status:0,
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
      //详情接口
      detailProduct(row){
        let id=row.id;
        this.$store.dispatch('setUserId',id);
        this.$router.push({
          path: `/userDetail`,
        });
      },
      //取消按钮
      prohibitBtn(row){
        let id=row.id;
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/flowPool/admin/prizes/cancelRewardsAudit",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
          },
          params:{
            id:id,
            status:3,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.$message({
              showClose: true,
              message: res.data.msgInfo,
              type: 'success'
            });
            this.getProductList();
          }else {
            this.$message.error(res.data.msgInfo);
          }
        });
      },
      //发货
      sendProduct(row){
        let id=row.id;
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/flowPool/admin/prizes/cancelRewardsAudit",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
          },
          params:{
            id:id,
            status:3,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.$message({
              showClose: true,
              message: res.data.msgInfo,
              type: 'success'
            });
            this.getProductList();
          }else {
            this.$message.error(res.data.msgInfo);
          }
        });
      },
      //过去长链接字段
      longUrlFormatter(row){
        let status=row.status;
        if (status == 0) {
          return '待发货';
        } else if (status == 1){
          return '发货中';
        } else if (status == 2){
          return '已发货';
        } else if (status == 3){
          return '取消';
        }
        return status;
      }
    },
    mounted:function () {
      this.getProductList(1,20,null,null);
      // this.getProducts();
    },
    data() {
      return {
        tableData: [],
        productListData: [],
        productId:null,
        pageNum: null,
        proTotal:null,
        pageSize:null,
        priceId:'',
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
        channelName:'',
        subChannelName:'',
        value7:'',
        startTime:'',
        endTime:'',
        locked:null,
        lockedList:[
          {key:null,Id:'所有状态'},
          {key:1,Id:'已锁定'},
          {key:0,Id:'未锁定'},
        ],
        ids:[],
        multipleSelection:[]
      }
    }
  }
</script>

<style scoped>
  #batchDele{
    margin-left:30px;
  }
  #batchPass{
    margin-left:30px;
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
