<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>金币抽大奖</el-breadcrumb-item>
    </el-breadcrumb>
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
          label="编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="priceId"
          label="奖品ID"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="priceTitle"
          label="奖品标题"
          align="center"
          width="200">
        </el-table-column>
        <el-table-column
          prop="priceNumber"
          label="奖品期号"
          align="center"
          width="200">
        </el-table-column>
        <el-table-column
          prop="luckyNumber"
          label="幸运号码"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="奖品创建时间"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="updateDate"
          label="奖品更新时间"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="奖品状态"
          align="center"
          :formatter="genderFormatter"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="收件人姓名"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="抽奖人手机号"
          align="center"
          width="140">
        </el-table-column>
        <!--<el-table-column-->
          <!--label="操作"-->
          <!--align="center"-->
          <!--width="200">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button @click="detailProduct(scope.row)" type="text" size="medium">详情</el-button>-->
            <!--<el-button @click="prohibitBtn(scope.row)" type="text" size="medium">{{(scope.row.status)?'禁用':'启用'}}</el-button>-->
            <!--<el-button @click="detailProduct(scope.row)" type="text" size="medium">中奖记录</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
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
        this.getProductList(1,20);
      },
      //条件查询
      searchContent(){
        this.getProductList(1,20);
      },
      //每页显示多少条
      handleSizeChange(val) {
        this.getProductList(this.pageNum,val);
        this.nowPageSizes=val;
      },
      //翻页
      handleCurrentChange(val) {
        this.getProductList(val,this.nowPageSizes);
      },
      /**
       * 获取金融产品列表
       * @param data1 查询第几页
       * @param data2 每页显示多少条数据
       * @param data3 活动名称
       */
      getProductList(data1,data2,data3){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/flowPool/admin/prizes/luckDrawRecord",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
          },
          params:{
            pageNum:data1,
            pageSize:data2,
            prizesId:this.id,
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
      //修改接口
      editProduct(row){
        let id=row.id;
        this.$router.push({
          path: `/modifyUserInformation/${id}`,
        });
      },
      //详情接口
      detailProduct(row){
        let id=row.id;
        this.$router.push({
          path: `/goldCoinDetail/${id}`,
        });
      },
      //禁用按钮
      prohibitBtn(row){
        let id=row.id;
        let status=(row.status==1)?0:1;
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/flowPool/admin/prizes/startOrStop",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
          },
          params:{
            id:row.id,
            status:status,
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
      addActivity(){
        this.$router.push({
          path: `/addGoldCoin`,
        });
      },
      //奖品状态字段
      genderFormatter(row){
        let gender = row.status;
        if(gender == 0){
          return '待开奖'
        } else if (gender == 1){
          return '未中奖'
        } else {
          return '中奖'
        }
      },
    },
    mounted:function () {
      this.id=this.$route.params.id;
      console.log(this.id);
      this.getProductList(1,20);
    },
    data() {
      return {
        activityName:'',
        tableData:[],
        productId:null,
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
