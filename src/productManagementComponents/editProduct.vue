<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/productProductList' }">产品列表</el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.type">编辑产品</el-breadcrumb-item>
      <el-breadcrumb-item v-if="!this.type">复制产品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="产品名称:" prop="productName">
        <el-input v-model="ruleForm.productName"></el-input>
      </el-form-item>
      <el-form-item label="产品说明:" prop="description">
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="商户名称:" prop="merchantId">
        <el-select v-model="ruleForm.merchantId" v-bind:disabled="type" placeholder="请选择">
          <el-option
            v-for="item in electData"
            :key="item.id"
            :label="item.merchantName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-if="this.type" @click="openWarning1('ruleForm')">立即修改</el-button>
        <el-button type="primary" v-if="!this.type" @click="openWarning2('ruleForm')">立即复制</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        electData:[],
        ruleForm: {
          productName: '',
          description: '',
          merchantId: null,
          merchantName: null,
        },
        rules: {
          productName: [
            { required: true, message: '请输入产品名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          description: [
            {  required: true, message: '请输入产品说明', trigger: 'change' }
          ],
          merchantId: [
            { required: true, message: '请选择商户名称', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.type);
            var param = new FormData();  // 创建form对象
            param.append('id', this.id)  // 通过append向form对象添加数据
            param.append('productName', this.ruleForm.productName)  // 通过append向form对象添加数据
            param.append('description', this.ruleForm.description) // 添加form表单中其他数据
            param.append('merchantId', this.ruleForm.merchantId) // 添加form表单中其他数据
            if (!this.type) {
              axios({
                method:"POST",
                url:"http://"+this.baseUrl+"/operate/admin/productManage/copyProduct",
                headers:{
                  'Content-Type':'application/x-www-form-urlencoded',
                  'Authorization': localStorage.token
                },
                data:param,
              }).then((res)=>{
                if(res.data.msgCd=='ZYCASH-200'){
                  this.$message({
                    message: '复制成功',
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
              axios({
                method:"POST",
                url:"http://"+this.baseUrl+"/operate/admin/productManage/saveProduct",
                headers:{
                  'Content-Type':'application/x-www-form-urlencoded',
                  'Authorization': localStorage.token
                },
                data:param,
              }).then((res)=>{
                if(res.data.msgCd=='ZYCASH-200'){
                  this.$message({
                    message: '修改成功',
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
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      openWarning1(){
        this.$confirm('是否确认更改产品信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.submitForm('ruleForm');
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });
        });
      },
      openWarning2(){
        this.$confirm('是否确认复制产品信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.submitForm('ruleForm');
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消复制'
          });
        });
      },
      getProductList(data){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/operate/admin/productManage/editProduct",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            id: data,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.ruleForm.merchantName= res.data.body.merchantName;
            this.ruleForm.merchantId= res.data.body.merchantId;
            this.ruleForm.productName= res.data.body.productName;
            this.ruleForm.description= res.data.body.description;
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      getNameList(){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/operate/admin/merchant/getNameList",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.electData= res.data.body.list;
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      }
    },
    mounted:function () {
      this.id=this.$route.params.id;
      this.type=!this.$route.params.copyType;
      this.getProductList(this.id);
      this.getNameList();
    }
  }
</script>

<style scoped>
  .content{
    padding-left: 200px;
    padding-top: 80px;
  }
  .demo-ruleForm{
    width: 600px;
    text-align: left;
  }
  .fs-16{
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .upload-file{
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
