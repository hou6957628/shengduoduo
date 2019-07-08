<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>金币抽大奖</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operationContent">
      <el-button id="addActivity" type="primary" @click="addActivity()" slot="append" icon="el-icon-plus">添加金币抽大奖</el-button>
      <el-input class="prizeNumber" placeholder="请输入奖品编号" v-model="prizeNumber" clearable></el-input>
      <el-input class="prizeName" placeholder="请输入奖品标题" v-model="prizeName" clearable></el-input>
      <el-button type="primary" @click="selectChange()" slot="append" icon="el-icon-search">搜索</el-button>
    </div>
    <template>
      <el-table
        :data="tableData"
        border
        highlight-current-row
        style="width:98%">
        <el-table-column
          fixed
          prop="number"
          align="center"
          label="奖品编号"
          width="170">
        </el-table-column>
        <el-table-column
          prop="title"
          label="奖品标题"
          align="center"
          width="200">
        </el-table-column>
        <el-table-column
          prop="price"
          label="奖品价格"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="奖品创建时间"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="updateDate"
          label="奖品开奖时间"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="奖品状态"
          align="center"
          width="80">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status == true ? 'primary' : 'danger'"
              disable-transitions>{{scope.row.status == 1 ? '启用' : '停用'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="isSpecify"
          label="是否指定终奖用户"
          align="center"
          width="140">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.isSpecify == true ? 'primary' : 'danger'"
              disable-transitions>{{scope.row.isSpecify == 1 ? '是' : '否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="uaAmount"
          label="已累计UV价值"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="currentPersonTime"
          label="已参与人数"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="personTime"
          label="总需人数"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="200">
          <template slot-scope="scope">
            <el-button @click="detailProduct(scope.row)" type="text" size="medium">编辑</el-button>
            <el-button @click="prohibit(scope.row)" type="text" :type="(scope.row.status)?'danger':'primary'" size="small">{{(scope.row.status)?'禁用':'启用'}}</el-button>
            <el-button @click="winningRecord(scope.row)" type="text" size="medium">中奖记录</el-button>
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
      title="是否禁用/启用此账号？"
      :visible.sync="centerDialogVisible"
      width="20%"
      center>
      <el-form ref="ruleForm" label-width="60px" class="demo-ruleForm">
        <el-form-item>
          <el-button type="primary" @click="prohibitBtn">确认<i class="el-icon-check el-icon--right"></i></el-button>
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
        this.getProductList(1,20,this.prizeNumber,this.prizeName);
      },
      //条件查询
      searchContent(){
        this.getProductList(1,20,this.prizeNumber,this.prizeName);
      },
      //每页显示多少条
      handleSizeChange(val) {
        this.getProductList(this.pageNum,val,this.prizeNumber,this.prizeName);
        this.nowPageSizes=val;
      },
      //翻页
      handleCurrentChange(val) {
        this.getProductList(val,this.nowPageSizes,this.prizeNumber,this.prizeName);
      },
      /**
       * 获取金融产品列表
       * @param data1 查询第几页
       * @param data2 每页显示多少条数据
       * @param data3 奖品编号
       * @param data4 奖品名称
       */
      getProductList(data1,data2,data3,data4){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/flowPool/admin/prizes/getPrizesListForPage",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
          },
          params:{
            pageNum:data1,
            pageSize:data2,
            number:data3,
            title:data4,
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
      //中奖记录
      winningRecord(row){
        let id=row.id;
        this.$router.push({
          path: `/goldCoinRecord/${id}`,
        });
      },
      //禁用弹窗
      prohibit(row){
        this.centerDialogVisible=true;
        this.$store.dispatch('setProhobit',row);
      },
      //禁用按钮
      prohibitBtn(row){
        let id=this.$store.state.prohobit.id;
        let statusDe=this.$store.state.prohobit.status;
        let status=(statusDe==1)?0:1;
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/flowPool/admin/prizes/startOrStop",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
          },
          params:{
            id:id,
            status:status,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.$message({
              showClose: true,
              message: res.data.msgInfo,
              type: 'success'
            });
            this.centerDialogVisible=false;
            this.getProductList(1,20);
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
      stopBtn(){},
    },
    mounted:function () {
      this.getProductList(1,20);
    },
    data() {
      return {
        prizeNumber:'',
        centerDialogVisible:false,
        prizeName:'',
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
  .prizeNumber{
    margin-left: 640px;
  }
  .prizeNumber, .prizeName{
    width: 200px;
  }
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
