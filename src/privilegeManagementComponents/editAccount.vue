<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/accountManagement' }">账号管理列表</el-breadcrumb-item>
      <el-breadcrumb-item>编辑账户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="角色名称:" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" prop="mobile">
        <el-input v-model="ruleForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item style="margin-top: 20px" label="角色:" prop="roleName">
        <el-select v-model="ruleForm.roleName" value-key="index" placeholder="请选择" @change="selectChange1($event,electData1)">
          <el-option
            v-for="(item,index) in electData1"
            :key="index"
            :label="item.roleName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="margin-top: 20px" label="管理产品:" prop="productName1">
        <el-select v-model="ruleForm.productName1" value-key="id" multiple placeholder="请选择" @change="selectChange2">
          <el-option
            v-for="item in products"
            :key="item.index"
            :label="item.productName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="margin-top: 20px" label="状态:" prop="enabled">
        <el-select v-model="ruleForm.enabled" value-key="key" placeholder="请选择" @change="selectChange">
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
          name: '',
          mobile: '',
          password: '',
          rePassword: '',
          roleName: '',
          productName1: '',
          enabled: 0,
        },
        rules: {
          name: [
            {required: true, message: '请输入产品说明', trigger: 'change'}
          ],
          mobile: [
            {required: true, message: '请选择是否启用', trigger: 'change'}
          ],
          password: [
            {required: true, message: '请选择是否启用', trigger: 'blur' }
          ],
          roleName: [
            {required: true, message: '请选择是否启用', trigger: 'change'}
          ],
          productName1: [
            {required: true, message: '请选择是否启用', trigger: 'change'}
          ],
          enabled: [
          {required: true, message: '请选择是否启用', trigger: 'change'}
        ],
        },
        electData: [
          {key:true,Id:"启用"},
          {key:false,Id:"停用"},
        ],
        electData1: [],
        electData2: [],
        tableData:[],
        electValue:0,
        electValue1:0,
        products:[],
        products1:[]
      };
    },
    methods: {

      //提交按钮
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var param = new FormData();
            param.append('id', this.id);
            param.append('name', this.ruleForm.name);
            param.append('mobile', this.ruleForm.mobile);
            param.append('password', this.ruleForm.password);
            param.append('roleId', this.ruleForm.roleId);
            param.append('enabled', this.ruleForm.enabled);
            param.append('productIds', this.ruleForm.productName1);
            axios({
              method: "POST",
              url: "http://"+this.baseUrl+"/operate/admin/account/save",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.token
              },
              data: param,
              // data:{
              //   id: this.id,
              //   name: this.ruleForm.name,
              //   mobile: this.ruleForm.mobile,
              //   password: this.ruleForm.password,
              //   roleId: this.ruleForm.roleId,
              //   enabled: this.ruleForm.enabled,
              //   productIds: this.ruleForm.productName1,
              // }
            }).then((res) => {
              if (res.data.msgCd == 'ZYCASH-200') {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.$router.push('/accountManagement');
              } else if (res.data.msgCd == 'ZYCASH-1009') {
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
      //下拉选择
      selectChange(row){
        console.log(this.ruleForm.enabled);
      },
      //下拉选择
      selectChange1(vId,list){
        let obj = {};
        obj = list.find((item)=>{
          return item.id ===vId;
        });
      },
      //下拉选择
      selectChange2(){
        this.$forceUpdate();
        console.log(this.ruleForm.productName1);
      },
      getProductList() {
        axios({
          method: "POST",
          // url:"http://"+this.baseUrl+"/operate/admin/merchant/list",
          url: "http://"+this.baseUrl+"/operate/admin/account/get",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params: {
            id: this.id,
          }
        }).then((res) => {
          if (res.data.msgCd == 'ZYCASH-200') {
            this.ruleForm = res.data.body;
            this.products.push({
              id: res.data.body.products[0].id,
              productName: res.data.body.products[0].productName,
            });
            this.ruleForm.productName2 = res.data.body.products[0].id.toString();
            this.ruleForm.productName1 = this.ruleForm.productName2.split(",");
            this.ruleForm.roleId = res.data.body.role.id;
            this.ruleForm.roleName = res.data.body.role.roleName;
            console.log(this.ruleForm.roleId);
          } else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //取消按钮
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //获取管理产品列表
      getProductList1(){
        axios({
          method: "POST",
          url: "http://"+this.baseUrl+"/operate/admin/productManage/list",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params: {
            pageNum: 1,
            pageSize: 30,
          }
        }).then((res) => {
          if (res.data.msgCd == 'ZYCASH-200') {
            this.electData2 = res.data.body.list;
            for(var i=0;i<this.electData2.length;i++){
              this.products.push({
                id:this.electData2[i].id.toString(),
                productName:this.electData2[i].productName
              });
              this.$forceUpdate();
              // console.log(this.products);
            }
          } else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },

      //获取角色列表
      getRoleList(){
        axios({
          method: "POST",
          url: "http://"+this.baseUrl+"/operate/admin/role/list",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params: {
            pageNum: 1,
            pageSize: 30,
          }
        }).then((res) => {
          if (res.data.msgCd == 'ZYCASH-200') {
            this.electData1 = res.data.body.list;
          } else {
            this.$message.error(res.data.msgInfo);
          }
        });
      }
    },
    mounted: function () {
       this.id=this.$route.params.id;
       this.getProductList();
       this.getProductList1();
       this.getRoleList();
    },

  }
</script>

<style scoped>
  .content {
    padding-left: 200px;
    padding-top: 80px;
  }

  .demo-ruleForm {
    width: 600px;
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
