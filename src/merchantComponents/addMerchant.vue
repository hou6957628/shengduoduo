<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/merchantProductList' }">商户列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加商户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商户名称:" prop="merchantName">
        <el-input v-model="ruleForm.merchantName"></el-input>
      </el-form-item>
      <el-form-item label="公司地址:" prop="companyAddress">
        <el-input v-model="ruleForm.companyAddress"></el-input>
      </el-form-item>
      <el-form-item label="公司描述:" prop="companyDetail">
        <el-input type="textarea" v-model="ruleForm.companyDetail"></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="enabled">
        <el-select v-model="ruleForm.enabled" placeholder="请选择">
          <el-option
            v-for="item in electData"
            :key="item.key"
            :label="item.Id"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        &nbsp;&nbsp;&nbsp;
        <el-button type="primary" @click="noSubmitForm()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        electData:[
          {key:0,Id:'不启用'},
          {key:1,Id:'启用'},
        ],
        electValue:'首页弹窗',
        ruleForm: {
          merchantName: '',
          companyAddress: '',
          companyDetail: null,
          enabled: null,
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
        }
      };
    },
    methods: {
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
    },
    mounted:function () {
      //this.getProductList();
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
