<template>
  <div class="content1">
    <el-row type="flex" class="row-bg" justify="left">
      <el-col :span="6" style="height: 55px;text-align: left;text-indent:6px;font-size: 20px;">
        <template>金币账户金额 ：<span style="color: red">{{account.amount}}</span>元
        </template>
      </el-col>
    </el-row >
    <template>
      <el-table
        :data="tableData"
        border
        highlight-current-row
        style="width:821px">
        <el-table-column
          fixed
          prop="id"
          align="center"
          label="金币编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="activityType"
          label="金币名称"
          :formatter="longUrlFormatter"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="获得金额"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="description"
          label="备注内容"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间"
          align="center"
          width="170">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="更新时间"
          align="center"
          width="170">
        </el-table-column>
        <!--<el-table-column-->
          <!--label="操作"-->
          <!--align="center"-->
          <!--width="200">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button @click="cancelBtn(scope.row)" type="text" size="medium">取消金币</el-button>-->
            <!--<el-button @click="deleteBtn(scope.row)" type="text" size="medium">删除</el-button>-->
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
        this.getProductList(1,20,this.realName,this.mobile,this.channelName,this.subChannelName,this.startTime,this.endTime,this.productId,this.locked);
      },
      //条件查询
      searchContent(){
        this.getProductList(1,20,this.realName,this.mobile,this.channelName,this.subChannelName,this.startTime,this.endTime,this.productId,this.locked);
      },
      //每页显示多少条
      handleSizeChange(val) {
        this.getProductList(this.pageNum,val,this.realName,this.mobile,this.channelName,this.subChannelName,this.startTime,this.endTime,this.productId,this.locked);
        this.nowPageSizes=val;
      },
      //翻页
      handleCurrentChange(val) {
        this.getProductList(val,this.nowPageSizes,this.realName,this.mobile,this.channelName,this.subChannelName,this.startTime,this.endTime,this.productId,this.locked);
      },
      /**
       * 获取金融产品列表
       * @param data1 查询第几页
       * @param data2 每页显示多少条数据
       * @param data3 用户姓名
       * @param data4 用户手机号
       * @param data5 主渠道
       * @param data6 子渠道
       * @param data7 开始时间
       * @param data8 结束时间
       * @param data9 产品id
       * @param data10 锁定状态
       */
      getProductList(data1,data2){
        axios({
          method:"GET",
          url:"http://"+this.baseUrl+"/flowPool/admin/cusCoinAccount/list",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
          },
          params:{
            pageNum:data1,
            pageSize:data2,
            cusId:this.$store.state.userId,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.tableData=res.data.body.page.list;
            this.account=res.data.body.account;
            this.proTotal=res.data.body.page.total;
            this.pageSize=res.data.body.page.pageSize;
            this.pageNum=res.data.body.page.pageNum;
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //修改接口
      cancelBtn(row){
        let id=row.id;
        axios({
          method:"GET",
          url:"http://"+this.baseUrl+"/flowPool/admin/cusCoinAccount/cancel",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
          },
          params:{
            id:id
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.$message({
              showClose: true,
              message: res.data.msgInfo,
              type: 'success'
            });
            this.getProductList(1,20);
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //详情接口
      detailBtn(row){
        let id=row.id;
        this.$store.dispatch('setUserId',id);
        this.$router.push({
          path: `/userDetail`,
        });
      },
      //禁用按钮
      deleteBtn(row){
        let id=row.id;
        axios({
          method:"GET",
          url:"http://"+this.baseUrl+"/flowPool/admin/cusCoinAccount/del",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
          },
          params:{
            id:id
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.$message({
              showClose: true,
              message: res.data.msgInfo,
              type: 'success'
            });
            this.getProductList(1,20);
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
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
      //过去长链接字段
      longUrlFormatter(row){
        //  0-红包墙 1-红包盛林 2-0元购 3-签到 4-注册  5-邀请 6-微信分享 7-游戏直播 8-美女直播 9-优惠券
        let status=row.activityType;
        if (status == 0) {
          return '红包墙';
        } else if (status == 1){
          return '红包森林';
        } else if (status == 2){
          return '0元购';
        } else if (status == 3){
          return '签到';
        } else if (status == 4){
          return '注册';
        } else if (status == 5){
          return '邀请';
        } else if (status == 6){
          return '微信分享';
        } else if (status == 7){
          return '游戏直播';
        } else if (status == 8){
          return '美女直播';
        }else if (status == 9){
          return '优惠券';
        }
        return status;
      }
    },
    mounted:function () {
      this.getProductList(1,20);
    },
    data() {
      return {
        tableData: [],
        productListData: [],
        account: [],
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
  .has-gutter .el-table th, .el-table tr {
    background-color: #909399;
  }{

  }
  .el-col-8{
    height: 55px;
  }
  .select{
    margin-left: 20px;
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
