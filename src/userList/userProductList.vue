<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
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
    </div>
    <template>
      <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        border
        highlight-current-row

        style="width:98%">
        <el-table-column
          fixed
          prop="id"
          align="center"
          label="用户ID"
          width="70">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="注册时间"
          align="center"
          width="170">
        </el-table-column>
        <el-table-column
          prop="channelName"
          label="主渠道"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="subChannelName"
          label="子渠道"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="recommendMobile"
          label="邀请人手机号"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="loginDate"
          label="最近登录应用时间"
          align="center"
          width="170">
        </el-table-column>
        <el-table-column
          prop="isActiveApp"
          label="激活APP"
          align="center"
          width="80">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.isActiveApp == true ? 'primary' : 'danger'"
              disable-transitions>{{scope.row.isActiveApp == true ? '是' : '否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="redEnvelopesBalance"
          label="红包账户"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="goldBalance"
          label="金币账户"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="200">
          <template slot-scope="scope">
            <el-button @click="detailProduct(scope.row)" type="text" size="medium">详情</el-button>
            <el-button @click="prohibitBtn(scope.row)" :type="(scope.row.enabled)?'primary':'danger'" size="small">{{(scope.row.enabled)?'禁用':'启用'}}</el-button>
            <el-button @click="editProduct(scope.row)" type="text" size="medium">修改</el-button>
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
    <!--修改登录密码-->
    <el-dialog
      title="修改登录密码"
      :visible.sync="centerDialogVisible1"
      width="40%"
      center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
        <el-form-item label="用户手机号:">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="登录密码:">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认<i class="el-icon-check el-icon--right"></i></el-button>
          <el-button type="info"  @click="centerDialogVisible1 = false">取消<i class="el-icon-close el-icon--right"></i></el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--线下还款结构-->
    <el-dialog
      title="是否禁用/启用此账号？"
      :visible.sync="centerDialogVisible"
      width="20%"
      center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
        <el-form-item>
          <el-button type="primary" @click="prohobit">确认<i class="el-icon-check el-icon--right"></i></el-button>
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
      //修改密码
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var param = new FormData();  // 创建form对象
            param.append('id', this.ruleForm.id);
            param.append('mobile', this.ruleForm.mobile);
            param.append('password', this.ruleForm.password);
            param.append('enabled', this.ruleForm.enabled);
            axios({
              method:"POST",
              url:"http://"+this.baseUrl+"/flowPool/admin/customer/update",
              headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization': this.$store.state.userToken
              },
              data:param,
            }).then((res)=>{
              if(res.data.msgCd=='ZYCASH-200'){
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.centerDialogVisible1=false;
                this.$router.push('/userProductList');
              }else if(res.data.msgCd=='ZYCASH-1009'){
                this.$message.error(res.data.msgInfo);
              }
              else {
                this.$message.error(res);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
          method:"POST",
          url:"http://"+this.baseUrl+"/flowPool/admin/customer/list",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
          },
          params:{
            pageNum:data1,
            pageSize:data2,
            username: data3,
            mobile: data4,
            channelName: data5,
            subChannelName: data6,
            startDate: data7,
            endDate: data8,
            productId: data9,
            locked: data10,
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
        this.ruleForm.id=row.id;
        this.ruleForm.mobile=row.mobile;
        this.ruleForm.password=row.password;
        this.ruleForm.enabled=row.enabled;
        this.centerDialogVisible1=true;
      },
      //详情接口
      detailProduct(row){
        let id=row.id;
        this.$store.dispatch('setUserId',id);
        this.$router.push({
          path: `/userDetail`,
        });
      },
      //禁用弹窗
      prohibitBtn(row){
        this.centerDialogVisible=true;
        this.$store.dispatch('setProhobit',row);
      },
      //禁用功能
      prohobit(row){
        let id=this.$store.state.prohobit.id;
        axios({
          method:"get",
          url:"http://"+this.baseUrl+"/flowPool/admin/customer/updateEnabled",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
          },
          params:{
            id:id,
            enabled:!this.$store.state.prohobit.enabled,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.$message({
              showClose: true,
              message: res.data.msgInfo,
              type: 'success'
            });
            this.centerDialogVisible=false;
            this.getProductList();
          }else {
            this.$message.error(res.data.msgInfo);
          }
        });
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
      //全选
      handleSelectionChange(val) {
        this.multipleSelection = val;
        let ids = []
        this.multipleSelection.map((item)=> {
          ids.push(item.id);
        })
        this.ids = ids;
      },
    },
    mounted:function () {
      this.getProductList(1,20);
    },
    data() {
      return {
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
        centerDialogVisible1:false,
        centerDialogVisible:false,
        realName:'',
        mobile:'',
        channelName:'',
        subChannelName:'',
        value7:'',
        startTime:'',
        endTime:'',
        ruleForm: {
          id: '',
          mobile: '',
          password: '',
          enabled:''
        },
        rules: {
          mobile: [
            { required: true, message: '请输入账户', trigger: 'blur' },
          ],
          password: [
            {  required: true, message: '请输入密码', trigger: 'blur' }
          ],
        },
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
