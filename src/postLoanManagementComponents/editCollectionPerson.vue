<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/collectionPersonManagement' }">催收人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加催收人员</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名:" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" prop="mobile">
        <el-input v-model="ruleForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="所属群组" prop="groupId">
        <el-select v-model="ruleForm.groupId" placeholder="请选择">
          <!--<el-option-->
            <!--v-for="item in ruleForm.operationGroupList"-->
            <!--:key="item.id"-->
            <!--:label="item.groupName"-->
            <!--:value="item.id">-->
          <!--</el-option>-->
        </el-select>
        <el-button @click="gozu()" style="margin-left: 50px">创建群组</el-button>
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select v-model="ruleForm.roleId" value-key="id" placeholder="请选择">
          <el-option
            v-for="item in ruleForm.operationRoleList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="催收产品" prop="productId">
        <el-select v-model="ruleForm.productId" value-key="productId" multiple placeholder="请选择" @change="selectChange">
          <el-option
            v-for="item in ruleForm.operationMerchantProductList"
            :key="item.productId"
            :label="item.productName"
            :value="item.productId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否启用" prop="enabled">
        <el-select v-model="ruleForm.enabled" placeholder="请选择" value-key="key">
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
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入确认密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      //手机号验证
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };
      return {
        electData:[
          {key:false,Id:'不启用'},
          {key:true,Id:'启用'},
        ],
        ruleForm: {
          name: '',
          mobile: '',
          password: '',
          enabled: 1,
          operationRoleList: '',
          operationGroupList: '',
          operationMerchantProductList: [],
          operationMerchantProductList1: [],
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          mobile: [
            {  required: true, validator: checkPhone, trigger: 'blur' }
          ],
          password: [
            {  required: true, message: '请输入密码', trigger: 'change' }
          ],
          groupId: [
            {  required: true, message: '请选择所属群组', trigger: 'change' }
          ],
          roleId: [
            {  required: true, message: '请选择角色', trigger: 'change' }
          ],
          productId: [
            {  required: true, message: '请选择催收产品', trigger: 'blur' }
          ],
          rePassword: [
            {  required: true, validator: validatePass2, trigger: 'blur' }
          ],
          enabled: [
            { required: true, message: '请选择是否启用', trigger: 'change' }
          ]
        }
      };

    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var param = new FormData();  // 创建form对象
            param.append('name', this.ruleForm.name);
            param.append('mobile', this.ruleForm.mobile);
            param.append('password', this.ruleForm.password);
            param.append('roleId', this.ruleForm.roleId);
            param.append('enabled', this.ruleForm.enabled);
            param.append('productId', this.ruleForm.productId);
            param.append('groupId', this.ruleForm.groupId);
            axios({
              method:"POST",
              url:"http://"+this.baseUrl+"/operate/admin/collection/save",
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
                this.$router.push('/collectionPersonManagement');
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
      //
      selectChange(row){
        // console.log(this.ruleForm.productId);
        console.log(typeof (this.ruleForm.productId));

      },
      /**
       * 获取群组，角色，产品列表
       * @param data1 查询第几页
       * @param data2 每页显示多少条数据
       * @param data3 催收员姓名或者手机号
       */
      getProductList(){
        var _this=this;
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/operate/admin/collection/get",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{}
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            _this.ruleForm.operationRoleList=res.data.body.operationRoleList;
            _this.ruleForm.operationGroupList=res.data.body.operationGroupList;
            _this.ruleForm.operationMerchantProductList1=res.data.body.operationMerchantProductList;
            console.log("长度"+_this.ruleForm.operationMerchantProductList1.length);
            for(var i=0;i<_this.ruleForm.operationMerchantProductList1.length;i++){
              _this.ruleForm.operationMerchantProductList.push({
                productId:_this.ruleForm.operationMerchantProductList1[i].productId,
                productName:_this.ruleForm.operationMerchantProductList1[i].productName
              });
              _this.$forceUpdate();
               console.log(_this.ruleForm.operationMerchantProductList1);
            }
          }else {
            _this.$message.error(res.data.msgInfo);
          }
        })
      },
      getProductList1(){
        var _this=this;
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/operate/admin/collection/find",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            id:this.id
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            _this.ruleForm=res.data.body.accountManager;
            _this.ruleForm.groupId=res.data.body.accountManager.operationGroup.id;
            _this.ruleForm.roleId=res.data.body.accountManager.role.id;
            _this.ruleForm.productId=res.data.body.accountManager.products[0].id;
            console.log(_this.ruleForm.groupId);
            console.log(_this.ruleForm.roleId);
            console.log(_this.ruleForm.productId);
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
    },
    mounted:function () {
      this.id=this.$route.params.id;
      this.getProductList();
      this.getProductList1();
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
