<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/channelconnectionManagement' }">渠道连接管理</el-breadcrumb-item>
      <el-breadcrumb-item>子渠道详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="主渠道名称:" prop="parentChannelName">
        <el-input v-model="ruleForm.parentChannelName" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="子渠道名称:" prop="subChannelName">
        <el-input v-model="ruleForm.subChannelName" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="所属应用:" prop="productName">
        <el-select v-model="ruleForm.productName" placeholder="请选择" @change="selectChange($event,electData)">
          <el-option
            v-for="item in electData"
            :key="item.productCode"
            :label="item.productName"
            :value="item.productCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="渠道账户:" prop="subChannelCode">
        <el-input v-model="ruleForm.subChannelCode"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
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
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        electValue: '',
        ruleForm: {
          id: '',
          parentChannelName: '',
          subChannelName: '',
          productName: '',
          subChannelCode: '',
          password: '',
          cpaPrice: '',
          cpsPrice:'',
        },
        rules: {
          parentChannelName: [
            {required: true, message: '请输入标签分类名称', trigger: 'blur'},
          ],
          subChannelName: [
            {required: true, message: '请输入产品说明', trigger: 'change'}
          ],
          productName: [
            {required: true, message: '请选择是否启用', trigger: 'change'}
          ],
          subChannelCode: [
            {required: true, message: '请选择是否启用', trigger: 'change'}
          ],
          password: [
            {required: true, message: '请选择是否启用', trigger: 'change'}
          ],
          cpaPrice: [
            {required: true, message: '请选择是否启用', trigger: 'change'}
          ],
          cpsPrice: [
            {required: true, message: '请选择是否启用', trigger: 'change'}
          ],
        },
        electData: [
          {key:0,Id:"全部产品"},
          {key:1,Id:"借点儿"},
          {key:2,Id:"夏花花"},
          {key:3,Id:"取消救济"},
        ],
        tableData:[],
        electValue:0,
      };
    },
    methods: {
      //提交按钮
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var param = new FormData();  // 创建form对象
            param.append('id', this.id)
            param.append('parentChannelName', this.ruleForm.parentChannelName)
            param.append('subChannelName', this.ruleForm.subChannelName)
            param.append('productName', this.ruleForm.productName1)
            param.append('productCode', this.ruleForm.productCode1)
            param.append('productId', this.ruleForm.productId1)
            param.append('merchantId', this.ruleForm.merchantId)
            param.append('merchantName', this.ruleForm.merchantName)
            param.append('merchantCode', this.ruleForm.merchantCode)
            param.append('password', this.ruleForm.password)
            param.append('cpaPrice', this.ruleForm.cpaPrice)
            param.append('cpsPrice', this.ruleForm.cpsPrice)
            axios({
              method: "get",
              // url:"http://"+this.baseUrl+"/operate/admin/productManage/createProduct",
              url: "http://"+this.baseUrl+"/channel/admin/channel/updateById",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.token
              },
              params:{
                id: this.id,
                parentChannelName: this.ruleForm.parentChannelName,
                subChannelName: this.ruleForm.subChannelName,
                productName: this.ruleForm.productName1,
                productCode: this.ruleForm.productCode1,
                productId: this.ruleForm.productId1,
                merchantId: this.ruleForm.merchantId,
                merchantName: this.ruleForm.merchantName,
                merchantCode: this.ruleForm.merchantCode,
                password: this.ruleForm.password,
                cpaPrice: this.ruleForm.cpaPrice,
                cpsPrice: this.ruleForm.cpsPrice,
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
      //下拉选择
      selectChange(vId,list){
        let obj = {};
        obj = list.find((item)=>{
          return item.productCode ===vId;
        });
        this.ruleForm.productName1=obj.productName;
        this.ruleForm.productCode1=vId;
        this.ruleForm.productId1=obj.productId;
        console.log(obj.productName);
        console.log(obj.productId);
        console.log(vId);
      },
      getProductList(data) {
        axios({
          method: "GET",
          // url:"http://"+this.baseUrl+"/operate/admin/merchant/list",
          url: "http://"+this.baseUrl+"/channel/admin/channel/getById",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params: {
            id: data,
          }
        }).then((res) => {
          if (res.data.msgCd == 'ZYCASH-200') {
            this.ruleForm = res.data.body.channelParent;
            this.electData = res.data.body.productList;
            this.ruleForm.merchantCode= res.data.body.channelParent.merchantCode;
            this.ruleForm.merchantId= res.data.body.channelParent.merchantId;
            this.ruleForm.productName1= res.data.body.channelParent.productName;
            this.ruleForm.productCode1= res.data.body.channelParent.productCode;
            this.ruleForm.productId1= res.data.body.channelParent.productId;
            console.log(this.ruleForm.productName1);
            console.log(this.ruleForm.productCode1);
            console.log(this.ruleForm.productId1);
          } else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //取消按钮
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    mounted: function () {
      this.id=this.$route.params.id;
      this.getProductList(this.id);
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
