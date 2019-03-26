<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/channelconnectionManagement' }">渠道链接管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑渠道</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" :key="1" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="主渠道名称:">
        <el-select v-model="ruleForm.parentChannelCode" placeholder="请选择" disabled @change="selectChange1($event,channelList)">
          <el-option
            v-for="item in channelList"
            :key="item.id"
            :label="item.parentChannelName"
            :value="item.parentChannelCode">
          </el-option>
        </el-select>
        <!--<el-button @click="addChannel()" type="primary" style="position: absolute;right:0;top: 0;">添加主渠道</el-button>-->
      </el-form-item>
      <el-form-item label="子渠道名称:">
        <el-input v-model="ruleForm.subChannelName" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="渠道账户:" prop="parentChannelCode">
        <el-input v-model="ruleForm.parentChannelCode" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="所属应用:" prop="productId">
        <el-select v-model="ruleForm.productId" placeholder="请选择" @change="selectChange2($event,productList)">
          <el-option
            v-for="item in productList"
            :key="item.productId"
            :label="item.productName"
            :value="item.productId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="ruleForm.password" maxlength="10" placeholder="请输入子渠道数"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button type="" @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        ruleForm: {
          id:'',
          parentChannelName: '',
          parentChannelCode: '',
          productId: '',
          productName: '',
          productCode: '',
          cpaPrice: '',
          cpsPrice: '',
          password: '',
        },
        rules: {
          productId: [
            {required: true, message: '请选择产品', trigger: 'change'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
        },
        channelList:[],
        productList:[],
        tableData:[],
        centerDialogVisible:false,
      };
    },
    methods: {
      //保存渠道
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios({
              method: "POST",
              url: "http://"+this.baseUrl+"/channel/admin/channel/updateById",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.token
              },
              params:{
                id:this.ruleForm.id,
                parentChannelName: this.ruleForm.parentChannelName,
                parentChannelCode: this.ruleForm.parentChannelCode,
                subChannelName: this.ruleForm.subChannelName,
                productName: this.ruleForm.productName,
                productCode: this.ruleForm.productCode,
                productId: this.ruleForm.productId,
                merchantId: this.ruleForm.merchantId,
                merchantName: this.ruleForm.merchantName,
                merchantCode: this.ruleForm.merchantCode,
                password: this.ruleForm.password,
              },
            }).then((res) => {
              if (res.data.msgCd == 'ZYCASH-200') {
                this.$message({
                  message: '操作成功',
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
      //主渠道名称下拉选择
      selectChange1(vId,list){
        let obj = {};
        obj = list.find((item)=>{
          return item.parentChannelCode ===vId;
        });
        this.ruleForm.parentChannelName=obj.parentChannelName;
        this.ruleForm.parentChannelCode=obj.parentChannelCode;
      },
      //所属应用下拉选择
      selectChange2(vId,list){
        let obj1 = {};
        obj1 = list.find((item)=>{
          return item.productId ===vId;
        });
        this.ruleForm.productName=obj1.productName;
        this.ruleForm.productCode=obj1.productCode;
        this.ruleForm.merchantId=obj1.merchantId;
        this.ruleForm.merchantName=obj1.merchantName;
        this.ruleForm.merchantCode=obj1.merchantCode;
      },
      //获取所有主渠道和产品
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
          } else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //取消按钮
      resetForm() {
        this.$router.go(-1);
      },
      //跳转到主渠道
      addChannel(){
        this.centerDialogVisible=true;
      },
      //获取渠道详情
      getChannelById(data) {
        axios({
          method: "GET",
          url: "http://"+this.baseUrl+"/channel/admin/channel/getById",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            id:data
          }
        }).then((res) => {
          if (res.data.msgCd == 'ZYCASH-200') {
            this.ruleForm = res.data.body.channelParent;
          } else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
    },
    mounted: function () {
      this.id=this.$route.params.id;
      this.getProductList();
      this.getChannelById(this.id);
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
