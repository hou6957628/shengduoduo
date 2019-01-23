<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/channelconnectionManagement' }">渠道连接管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加渠道</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" :key="1" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="主渠道名称:" prop="parentChannelName">
        <el-select v-model="ruleForm.parentChannelName" placeholder="请选择" @change="selectChange1($event,channelList)">
          <el-option
            v-for="item in channelList"
            :key="item.id"
            :label="item.parentChannelName"
            :value="item.parentChannelCode">
          </el-option>
        </el-select>
        <el-button @click="addChannel()" type="primary" style="position: absolute;right:0;top: 0;">添加主渠道</el-button>
      </el-form-item>
      <el-form-item label="渠道账户:" prop="parentChannelCode">
        <el-input v-model="ruleForm.parentChannelCode" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="所属应用:" prop="productName1">
        <el-select v-model="ruleForm.productName1" placeholder="请选择" @change="selectChange2($event,productList)">
          <el-option
            v-for="item in productList"
            :key="item.productId"
            :label="item.productName"
            :value="item.productCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建子渠道数:" prop="number">
        <el-tooltip class="item" effect="dark" content="一次性创建请小于10个" placement="right-start">
          <el-input v-model="ruleForm.number" maxlength="10" placeholder="请输入子渠道数"></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="CPA:" prop="cpaPrice">
        <el-input v-model="ruleForm.cpaPrice"></el-input>
      </el-form-item>
      <el-form-item label="CPS:" prop="cpsPrice">
        <el-input v-model="ruleForm.cpsPrice"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button type="" @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
    <el-form :model="ruleForm1" :key="2" :rules="rulesList" ref="ruleForm1" label-width="120px" class="demo-ruleForm">
    <el-dialog
      title="添加主渠道"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <el-form-item label="主渠道名称:" prop="parentChannelName1">
        <el-input v-model="ruleForm1.parentChannelName1"></el-input>
      </el-form-item>
      <el-form-item label="主渠道账号:" prop="parentChannelCode1">
        <el-input v-model="ruleForm1.parentChannelCode1"></el-input>
      </el-form-item>
      <span slot="footer" class="dialog-footer">
    <el-button @click="resetForm1('ruleForm1')">取 消</el-button>
    <el-button type="primary" @click="submitForm1('ruleForm1')">确 定</el-button>
  </span>
    </el-dialog>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        ruleForm: {
          parentChannelName: '',
          parentChannelCode: '',
          productName: '',
          productName1: '',
          number: '',
          cpaPrice: '',
          cpsPrice: '',
        },
        rules: {
          parentChannelName: [
            {required: true, message: '请输入主渠道名称', trigger: 'change'},
          ],
          parentChannelCode: [
            {required: true, message: '请输入渠道账户', trigger: 'change'}
          ],
          productName1: [
            {required: true, message: '请选择渠道账户', trigger: 'change'}
          ],
          number: [
            {required: true, message: '请输入创建子渠道数', trigger: 'change'}
          ],
          cpaPrice: [
            {required: true, message: '请输入CPA', trigger: 'change'}
          ],
          cpsPrice: [
            {required: true, message: '请输入CPS', trigger: 'change'}
          ]
        },
        ruleForm1: {
          parentChannelName1: '',
          parentChannelCode1: '',
        },
        rulesList: {
          parentChannelName1: [
            {required: true, message: '请输入主渠道名称', trigger: 'blur'},
          ],
          parentChannelCode1: [
            {required: true, message: '请输入主渠道账户', trigger: 'blur'}
          ]
        },
        channelList:[],
        productList:[],
        tableData:[],
        electValue:0,
        parentChannelName:null,
        parentChannelCode:null,
        centerDialogVisible:false,
      };
    },
    methods: {
      //提交按钮
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios({
              method: "POST",
              url: "http://"+this.baseUrl+"/channel/admin/channel/add",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.token
              },
              params:{
                id: this.ruleForm.id,
                parentChannelName: this.ruleForm.parentChannelName,
                parentChannelCode: this.ruleForm.parentChannelCode,
                subChannelName: this.ruleForm.subChannelName,
                productName: this.ruleForm.productName2,
                productCode: this.ruleForm.productCode,
                productId: this.ruleForm.productId,
                merchantId: this.ruleForm.merchantId,
                merchantName: this.ruleForm.merchantName,
                merchantCode: this.ruleForm.merchantCode,
                password: this.ruleForm.password,
                cpaPrice: this.ruleForm.cpaPrice,
                cpsPrice: this.ruleForm.cpsPrice,
                number: this.ruleForm.number,
              },
            }).then((res) => {
              if (res.data.msgCd == 'ZYCASH-200') {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.$router.push('/channelconnectionManagement');
              } else if (res.data.msgCd == 'ZYCASH-1009') {
                this.$message.error(res.data.msgInfo);
              }
              else {
                this.$message.error(res.data.msgInfo);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //提交按钮
      submitForm1(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios({
              method: "POST",
              url: "http://"+this.baseUrl+"/channel/admin/channel_parent/add",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.token
              },
              params:{
                parentChannelName: this.ruleForm1.parentChannelName1,
                parentChannelCode: this.ruleForm1.parentChannelCode1,
              },
            }).then((res) => {
              if (res.data.msgCd == 'ZYCASH-200') {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.getProductList();
                this.centerDialogVisible=false;
              } else if (res.data.msgCd == 'ZYCASH-1009') {
                this.$message.error(res.data.msgInfo);
              }
              else {
                this.$message.error(res.data.msgInfo);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //主渠道名称下拉选择
      selectChange1(vId,list){
        let obj = {};
        obj = list.find((item)=>{
          return item.parentChannelCode ===vId;
        });
        this.ruleForm.parentChannelName=obj.parentChannelName;
        this.ruleForm.parentChannelCode=obj.parentChannelCode;
        this.ruleForm.id=obj.id;
        console.log(obj.parentChannelName);
        console.log(obj.id);
        console.log(vId);
      },
      //所属应用下拉选择
      selectChange2(vId,list){
        let obj1 = {};
        obj1 = list.find((item)=>{
          return item.productCode ===vId;
        });
        this.ruleForm.productName2=obj1.productName;
        this.ruleForm.productId=obj1.productId;
        this.ruleForm.productCode=vId;
        this.ruleForm.merchantId=obj1.merchantId;
        this.ruleForm.merchantName=obj1.merchantName;
        this.ruleForm.merchantCode=obj1.merchantCode;
        console.log(this.ruleForm.productName);
        console.log(this.ruleForm.productId);
        console.log(this.ruleForm.productCode);
        console.log(this.ruleForm.merchantId);
        console.log(this.ruleForm.merchantName);
        console.log(this.ruleForm.merchantCode);
      },
      getProductList() {
        axios({
          method: "GET",
          url: "http://"+this.baseUrl+"/channel/admin/channel/get",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
        }).then((res) => {
          if (res.data.msgCd == 'ZYCASH-200') {
            this.channelList = res.data.body.channelParentList;
            this.productList = res.data.body.productList;
            console.log(this.channelList);
            console.log(this.productList);
          } else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //取消按钮
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      resetForm1(formName) {
        this.centerDialogVisible=false;
        this.$refs[formName].resetFields();
      },
      //跳转到主渠道
      addChannel(){
        this.centerDialogVisible=true;
      },
    },
    mounted: function () {
       this.getProductList();
    }
  }
</script>

<style scoped>
  .content {
    padding-left: 200px;
    padding-top: 80px;
  }

  .demo-ruleForm {
    width: 500px;
    text-align: left;
  }

  .fs-16 {
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .upload-file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 30px;
    height: 30px;
  }

  .upload-file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }

  .upload-file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
  }
</style>
