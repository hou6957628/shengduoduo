<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>提现审核</el-breadcrumb-item>
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
        <template>主渠道：
          <el-input class="searchContent" placeholder="主渠道名称" v-model="channelName" clearable></el-input>
        </template>
      </el-col>
      <el-col :span="6" style="height: 55px;">
        <template>子渠道：
          <el-input class="searchContent" placeholder="子渠道名称" v-model="subChannelName" clearable></el-input>
        </template>
      </el-col>
      <el-col :span="6" style="height: 55px;">
        <template>状态：
          <el-select v-model="status" @change="selectChange1($event,electData)">
            <el-option
              v-for="item in electData"
              :key="item.key"
              :label="item.Id"
              :value="item.key">
            </el-option>
          </el-select>
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
      </template>&nbsp;&nbsp;
      <el-button id="searchBtn" type="primary" @click="searchContent()" slot="append" icon="el-icon-search">查询</el-button>
      <el-button id="batchDele" type="danger" @click="batchDeletion()" slot="append" icon="el-icon-delete">批量删除</el-button>
      <el-button id="batchPass" type="success" @click="batchPass()" slot="append" icon="el-icon-check">批量通过</el-button>
    </div>
    <template>
      <el-table
        ref="multipleTable"
        :data="tableData"
        @selection-change="handleSelectionChange"
        border
        highlight-current-row
        style="width:98%">
        <el-table-column
          type="selection"
          label="批量"
          width="55">
        </el-table-column>
        <el-table-column
          fixed
          prop="id"
          align="center"
          label="提现ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户姓名"
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
          prop="registerDate"
          label="注册时间"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="提现金额"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="提现申请时间"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="账户分类"
          align="center"
          :formatter="genderFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="redPacketAccount"
          label="红包账户"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="status"
          label="提现状态"
          align="center"
          :formatter="longUrlFormatter"
          width="100">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="200">
          <template slot-scope="scope">
            <el-button @click="detailProduct(scope.row)" type="text" size="medium">详情</el-button>
            <el-button @click="cancelBtn(scope.row)" type="text" size="medium">取消</el-button>
            <el-button @click="passBtn(scope.row)" type="text" size="medium">通过</el-button>
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
      //状态下拉选择
      selectChange1(vId,list){
        let obj1 = {};
        obj1 = list.find((item)=>{
          return item.Id ===vId;
        });
        this.getProductList(1,20,this.realName,this.mobile,this.channelName,this.subChannelName,this.startTime,this.endTime,this.productId);
        console.log(this.status);
      },
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
      getProductList(data1,data2,data3,data4,data5,data6,data7,data8,data9,data10){
        axios({
          method:"post",
          url:"http://"+this.baseUrl+"/flowPool/admin/casheAudit/list",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
          },
          params:{
            pageNum:data1,
            pageSize:data2,
            name: data3,
            mobile: data4,
            status:this.status,
            parentChannelId: data5,
            channelId: data6,
            startDate: data7,
            endDate: data8,
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
          path: `/cashDetail/${id}`,
        });
      },
      //取消按钮
      cancelBtn(row){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/flowPool/admin/casheAudit/batch",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
          },
          params:{
            type:0,
            ids:row.id,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.$message({
              showClose: true,
              message: '操作成功',
              type: 'success'
            });
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //通过按钮
      passBtn(row){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/flowPool/admin/casheAudit/batch",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
          },
          params:{
            type:1,
            ids:row.id,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.$message({
              showClose: true,
              message: '操作成功',
              type: 'success'
            });
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //禁用按钮
      prohibitBtn(row){
        let id=row.id;
        alert(id);
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
      //查询产品列表
      getProducts(){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/order/admin/borrowing/getProductList",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.productListData=res.data.body;
            this.productListData.unshift({productId: null, productName: '全部产品'});
          } else if (res.data.msgCd=='ZYCASH-1005') {
            this.$message.error('登陆信息失效，请重新登陆');
            this.$router.push({path: `/login`,});
          } else if (res.data.msgCd=='SYS00001') {
            this.$message.error('登陆信息失效，请重新登陆');
            this.$router.push({path: `/login`,});
          } else {
            this.$message.error(res.data.msgInfo);
          }
        })
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
          this.customerId = this.multipleSelection[0].id;
        }
      },
      //批量删除
      batchDeletion(row){
        console.log(this.ids);
        if (this.multipleSelection == null) {
          this.$message({
            showClose: true,
            message: '请至少选择一条记录',
            type: 'warning'
          });
        } else {
          axios({
            method:"POST",
            url:"http://"+this.baseUrl+"/flowPool/admin/casheAudit/batch",
            headers:{
              'Content-Type':'application/x-www-form-urlencoded',
              'Authorization': this.$store.state.userToken
            },
            params:{
              type:0,
              ids:(this.ids).join(','),
            }
          }).then((res)=>{
            if(res.data.msgCd=='ZYCASH-200'){
              this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success'
              });
              this.getProductList(1,20,this.realName,this.mobile,this.channelName,this.subChannelName,this.startTime,this.endTime,this.productId);
            }else {
              this.$message.error(res.data.msgInfo);
            }
          })
        }
      },
      //批量通过
      batchPass(row){
        if (this.customerId == null) {
          this.$message({
            showClose: true,
            message: '请至少选择一条记录',
            type: 'warning'
          });
        } else {
          axios({
            method:"POST",
            url:"http://"+this.baseUrl+"/flowPool/admin/casheAudit/batch",
            headers:{
              'Content-Type':'application/x-www-form-urlencoded',
              'Authorization': this.$store.state.userToken
            },
            params:{
              type:1,
              ids:(this.ids).join(','),
            }
          }).then((res)=>{
            if(res.data.msgCd=='ZYCASH-200'){
              this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success'
              });
              this.getProductList(1,20,this.realName,this.mobile,this.channelName,this.subChannelName,this.startTime,this.endTime,this.productId);
            }else {
              this.$message.error(res.data.msgInfo);
            }
          })
        }
      },
      //过滤性别字段
      genderFormatter(row){
        let gender = row.type;
        if(gender == 0){
          return '银行卡'
        } else if (gender == 1){
          return '支付宝'
        } else {
          return '未知'
        }
      },
      //过去长链接字段
      longUrlFormatter(row){
        // 0：待审核 1：放款中 2：放款成功 4：放款失败 5：审核拒绝
        let status=row.status;
        if (status == 0) {
          return '待审核';
        } else if (status == 1){
          return '放款中';
        } else if (status == 2){
          return '放款成功';
        } else if (status == 4){
          return '放款失败';
        }else if (status == 5){
          return '审核拒绝';
        }
        return status;
      }
    },
    mounted:function () {
      this.getProductList(1,20,null,null,null,null,null,null,null,null);
    },
    data() {
      return {
        // 0：待审核 1：放款中 2：放款成功 4：放款失败 5：审核拒绝
        electData: [
          {key:0,Id:"待审核"},
          {key:1,Id:"放款中"},
          {key:2,Id:"放款成功"},
          {key:4,Id:"放款失败"},
          {key:5,Id:"审核拒绝"},
        ],
        status:0,
        tableData: [],
        productListData: [],
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
