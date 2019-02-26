<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>催收分单</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="listContent">
      <div class="listBox" v-for="(item,index) in productList" :key="index">{{item.productName}}</div>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-col :span="11" style="height: 55px;">
        <template>
          到期时间：
          <el-date-picker style="margin-left: 0"
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
                          @change="logTimeChange2()">
          </el-date-picker>
        </template>
      </el-col>
      <el-col :span="12" style="height: 55px;">
        渠道：
        <el-select v-model="channelNames" placeholder="请选择" multiple style="width: 400px">
          <el-option
            v-for="item in channelList"
            :key="item.subChannelName"
            :label="item.subChannelName"
            :value="item.subChannelName">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="10" style="height: 55px;">
        期数：
        <el-select v-model="period" placeholder="请选择">
          <el-option
            v-for="item in periodList"
            :key="item.id"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8" style="height: 55px;">
        新老户：
        <el-select v-model="reBorrow" placeholder="请选择">
          <el-option
            v-for="item in reBorrowList"
            :key="item.id"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" style="height: 55px;line-height: 40px;text-indent: 15px">
        案件数量:<span style="margin-right: 15px">{{casesNumber}}</span>
        <el-button type="primary"@click="searchContent()" >查询<i class="el-icon-search el-icon--right"></i></el-button>
      </el-col>
      <el-col :span="24">
        <h3 style="color: #606266;font-weight: 400;height: 40px">导入催收员</h3>
        <el-form-item style="margin-left: 0" class="labelList" v-for="(domain, index) in adminIds" :key="index">
            <div style="margin-left: -100px">
            催收员{{index}}： 姓名：
              <el-select v-model="adminId" @change="changeSelect($event,collectionList)">
                <el-option
                  v-for="item in collectionList"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
        </el-form-item>
          <el-button type="primary"  @click="addDomain" size="medium">添加催收员</el-button>
      </el-col>
      <el-col :span="24" style="margin-top: 30px;text-align: center">
        <el-button type="primary" class="btntn" @click="fendan()">分单</el-button><el-button class="btntn" @click="resetForm('ruleForm')">取消</el-button>
      </el-col>
    </el-form>
    <el-dialog
      title="分单提醒"
      :visible.sync="centerDialogVisible"
      width="40%"
      center>
      <el-col :span="6" v-for="(item,index) in orderList" :key="index" style="margin-bottom: 15px">{{item.name}}&nbsp;:&nbsp;{{item.value}}单</el-col>
      <el-col :span="24" style="height: 40px;margin-bottom: 20px">
        <el-col :span="6" style="font-size: 16px">共计:1008</el-col>
        <el-col :span="6" style="font-size: 16px">催收员:10人</el-col>
      </el-col>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="editTag()">确 定</el-button>
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        productId:'',
        productList:[],
        channelList:[],
        collectionList:[],
        value7:null,
        startDate:'',
        endDate:'',
        channelNames:[],
        period:null,
        reBorrow:null,
        casesNumber:'',
        centerDialogVisible:false,
        adminIds:[null],
        adminId:null,
        adminNames:[null],

        periodList:[
          {id:null,value:'全部期数'},
          {id:7,value:'7'},
          {id:14,value:'14'},
        ],
        reBorrowList:[
          {id:null,value:'全部用户'},
          {id:0,value:'新户'},
          {id:1,value:'老户'},
        ],
        orderList:[
          {name:"张磊",value:100},
          {name:"张磊",value:101},
          {name:"张磊",value:102},
          {name:"张磊",value:103},
          {name:"张磊",value:104},
        ],
        electValue:"",
        electValue1:"",
        electValue2:"",
        ruleForm: {
          merchantName: '',
          companyAddress: '',
          companyDetail: null,
          enabled: null,
          enabled1: [],
          enabled2: [],
          enabled3: [],
        },
        rules: {
          merchantName: [
            { required: true, message: '请输入商户名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          companyAddress: [
            { required: true, message: '请输入公司地址', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          companyDetail: [
            {  required: true, message: '请输入公司描述', trigger: 'change' }
          ],
          enabled: [
            { required: true, message: '请选择商户名称', trigger: 'change' }
          ]
        },
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
      };
    },
    methods: {
      //查询所有产品
      getProductList() {
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
            this.productId=this.productList[0].productId;
            // this.getCaseNumber(null,null,null,this.startDate,this.startDate,this.productId);
            this.getCaseNumber(null,null,null,this.startDate,this.startDate,61);
            // this.getCollectionList(this.productId);
            this.getCollectionList(17);
          }else if(res.data.msgCd=='ZYCASH-1009'){
            this.$message.error(res.data.msgInfo);
          }
          else {
            this.$message.error(res);
          }
        })
      },
      //查询所有渠道
      getChannelList() {
        axios({
          method:"POST",
          // url:"http://"+this.baseUrl+"/order/admin/borrowing/getChannelList",
          url:"http://39.105.217.251:31999/order/admin/borrowing/getChannelList",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.channelList=res.data.body;
          }else if(res.data.msgCd=='ZYCASH-1009'){
            this.$message.error(res.data.msgInfo);
          }
          else {
            this.$message.error(res);
          }
        })
      },
      //查询所有催收员
      getCollectionList(id) {
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/order/admin/borrowing/getCollection",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            productId: id,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.collectionList=res.data.body;
          }else if(res.data.msgCd=='ZYCASH-1009'){
            this.$message.error(res.data.msgInfo);
          }
          else {
            this.$message.error(res);
          }
        })
      },
      //条件查询规则集列表
      searchContent(){
        // this.getCaseNumber(this.channelNames,this.period,this.reBorrow,this.startDate,this.endDate,this.productId);
        this.getCaseNumber(this.channelNames,this.period,this.reBorrow,this.startDate,this.endDate,61);
      },
      /**
       * 查询案件数量
       * @param data1 渠道
       * @param data2 期数
       * @param data3 新老户
       * @param data4 开始时间
       * @param data5 结束时间
       * @param data6 产品id
       */
      getCaseNumber(data1,data2,data3,data4,data5,data6) {
        var data = {
          'channelNames':data1,
          'period':data2,
          'reBorrow':data3,
          'startDate':data4,
          'endDate':data5,
          'productId':data6,
        };
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/order/admin/borrowing/find",
          headers:{
            'Content-Type':'application/json',
            'Authorization': localStorage.token
          },
          data:JSON.stringify(data),
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.casesNumber=res.data.body;
          }else if(res.data.msgCd=='ZYCASH-1009'){
            this.$message.error(res.data.msgInfo);
          }
          else {
            this.$message.error(res);
          }
        })
      },
      //封装姓名
      changeSelect(vId,list){
        this.$forceUpdate();
        let obj = {};
        obj = list.find((item)=>{
          return item.id === vId;
        });
        this.adminIds[localStorage.num]=obj.id;
        this.adminNames[localStorage.num]=obj.roleName;
      },
      //添加数据
      addDomain() {
        localStorage.num++;
        this.adminIds[localStorage.num] = null;
        this.adminNames[localStorage.num] = null;
        console.log(this.adminIds);
      },
      //分单提醒
      fendan(){
        this.centerDialogVisible=true;
        var data = {
          'channelNames':this.channelNames,
          'period':this.period,
          'reBorrow':this.reBorrow,
          'startDate':this.startDate,
          'endDate':this.endDate,
          'productId':this.productId,
          'adminIds':this.adminIds,
          'adminNames':this.adminNames,
        };
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/order/admin/borrowing/assignForm",
          headers:{
            'Content-Type':'application/json',
            'Authorization': localStorage.token
          },
          data:JSON.stringify(data),
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.collectionList=res.data.body;
          }else if(res.data.msgCd=='ZYCASH-1009'){
            this.$message.error(res.data.msgInfo);
          }
          else {
            this.$message.error(res);
          }
        })
      },
      //真正分单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var param = new FormData();  // 创建form对象
            param.append('merchantName', this.ruleForm.merchantName)  // 通过append向form对象添加数据
            param.append('companyAddress', this.ruleForm.companyAddress) // 添加form表单中其他数据
            param.append('companyDetail', this.ruleForm.companyDetail) // 添加form表单中其他数据
            param.append('enabled', this.ruleForm.enabled) // 添加form表单中其他数据
            axios({
              method:"POST",
              url:"http://"+this.baseUrl+"/operate/admin/productManage/createProduct",
              headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization': localStorage.token
              },
              data:param,
            }).then((res)=>{
              if(res.data.msgCd=='ZYCASH-200'){
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.$router.push('/productProductList');
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
      //编辑产品接口
      editProduct(row){
        var param = new FormData();  // 创建form对象
        param.append('merchantName', this.ruleForm.merchantName);
        param.append('enabled', this.ruleForm.enabled);
        param.append('enableDelete', 0);
        param.append('company', null);
        param.append('companyAddress', this.ruleForm.companyAddress);
        param.append('companyDetail', this.ruleForm.companyDetail);
        param.append('email', null);
        param.append('mobile', null);
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/operate/admin/merchant/get",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          data:param,
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.$router.push('/merchantProductList');
          }else if(res.data.msgCd=='ZYCASH--1009'){
            this.$message.error(res.data.msgInfo);
          }
          else {
            this.$message.error(res);
          }
        })
      },

      fen(data){
        // this.idd=data;
        // this.value7=null;
        // this.electValue=null;
        // this.electValue1=null;
        // this.electValue2=null;
        // this.casesNumber=null;
        // this.electDataList.domains=[{
        //   itemAlias: 1,symbolCode: null,fieldCode:null,
        // }];
        // console.log(data);
      },
      editTag(){
        this.centerDialogVisible=true;
      },
      //创建群组
      gozu(){},
      //时间筛选2
      logTimeChange2(){
        if(this.value7==''||this.value7==null){
          this.startDate=this.startDate;
          this.endDate=this.startDate;
        }else {
          var startTime=this.value7[0];
          var endTime=this.value7[1];
          this.startDate=startTime;
          this.endDate=endTime;
        }
      },
    },
    mounted:function () {
      this.startDate=this.dateFormat(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0));
      this.endDate=this.startDate;
      this.value7=[this.startDate,this.endDate];
      localStorage.num=0;
      this.getProductList();
      this.getChannelList();
    }
  }
</script>

<style scoped>
  .btntn {
    width: 120px;
    height: 50px;
    font-size: 18px;
    letter-spacing: 2px;
    margin: 0 20px;
  }
  .content{
    padding-left: 200px;
    padding-top: 80px;
  }
  .demo-ruleForm{
    width: 80%;
    text-align: left;
  }
  .fs-16{
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .listContent{
    width: 100%;
    height: 80px;
    margin-bottom: 30px;
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
</style>
