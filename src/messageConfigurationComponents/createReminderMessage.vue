<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/reminderMessage' }">提醒消息</el-breadcrumb-item>
      <el-breadcrumb-item>创建提醒消息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
      <el-form-item label="名称:" prop="mobile">
        <el-input v-model="ruleForm.mobile"></el-input>
      </el-form-item>
      <el-form-item style="margin-top: 20px" label="请选择分类:" prop="roleName">
        <el-select v-model="ruleForm.roleName" value-key="id" placeholder="请选择" @change="selectChange1($event,electData1)">
          <el-option
            v-for="item in electData1"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId">
          </el-option>
        </el-select>
        <el-button @click="toAddProduct()" type="primary" plain>添加分类</el-button>
      </el-form-item>
      <el-form-item label="请输入备注:" prop="password">
        <el-input type="textarea":rows="4" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="请输入内容:" prop="desc">
        <el-input type="textarea":rows="4" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="ICON图标" prop="filename">
        <a class="upload-file" href="javascript:;" v-model="ruleForm.filename">{{ruleForm.image}}<input type="file" accept="image/png,image/gif,image/jpeg" value="上传弹窗图片"  @change="tirggerFile($event)"></a>
        <input class="fileBox" type="hidden" v-model="ruleForm.filename">
        <el-alert :closable="false" style="padding: 3px 16px;" title="icon推荐尺寸（80*80）" type="success"></el-alert>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button type="" @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
      <!--创建分类-->
      <el-dialog
        title="复制产品"
        :visible.sync="centerDialogVisible"
        width="40%"
        center>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="名称:" prop="productName">
            <el-input v-model="ruleForm.productName"></el-input>
          </el-form-item>
          <el-form-item label="请输入备注:" prop="description">
            <el-input type="textarea":rows="3" v-model="ruleForm.description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveMessage('ruleForm')">保存<i class="el-icon-check el-icon--right"></i></el-button>
            <el-button type="info"  @click="centerDialogVisible = false">取消<i class="el-icon-close el-icon--right"></i></el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
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
        ruleForm: {
          name: '',
          mobile: '',
          password: '',
          rePassword: '',
          roleName: '',
          productName: '',
          description: '',
          enabled: true,
          filename:'',
          desc:'',
          image:'上传Icon图片',
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
          rePassword: [
            {  required: true, validator: validatePass2, trigger: 'blur' }
          ],
          roleName: [
            {required: true, message: '请选择是否启用', trigger: 'blur'}
          ],
          productName1: [
            {required: true, message: '请选择是否启用', trigger: 'blur'}
          ],
          enabled: [
            {required: true, message: '请选择是否启用', trigger: 'change'}
          ],
          productName: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请输入内容', trigger: 'change' }
          ],
          filename: [
            { required: true, message: '请选择ICON图标', trigger: 'change' }
          ],
          description: [
            { required: true, message: '请选择备注', trigger: 'change' }
          ]
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
        products1:[],
        centerDialogVisible:false,
      };
    },
    methods: {

      //提交按钮
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var param = new FormData();
            // param.append('file1', this.ruleForm.filename)
            param.append('id', this.id);
            param.append('name', this.ruleForm.name);
            param.append('mobile', this.ruleForm.mobile);
            param.append('password', this.ruleForm.password);
            param.append('roleId', this.ruleForm.roleName);
            param.append('roleName', this.ruleForm.roleName);
            param.append('enabled', this.ruleForm.enabled);
            param.append('products', this.ruleForm.productName1);
            axios({
              method: "POST",
              url: "http://39.105.217.251:9998/operate/admin/account/save",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.token
              },
              data: param,
            }).then((res) => {
              if (res.data.msgCd == 'ZYCASH-200') {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.$router.push('/productProductList');
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
        console.log(this.ruleForm.roleName);
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
          url: "http://39.107.228.38:31999/operate/admin/account/get",
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
              id:res.data.body.products[0].id,
              productName:res.data.body.products[0].productName,
            });
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
                id:this.electData2[i].id,
                productName:this.electData2[i].productName
              });
              this.$forceUpdate();
              console.log(this.products);
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
            console.log(this.electData1);
          } else {
            this.$message.error(res.data.msgInfo);
          }
        });
      },

      //创建分类
      toAddProduct(){
        this.centerDialogVisible=true;
      },
      //保存分类
      saveMessage(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var param = new FormData();  // 创建form对象
            param.append('id', this.copyId)  // 通过append向form对象添加数据
            param.append('productName', this.ruleForm.productName)  // 通过append向form对象添加数据
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
                  message: '保存成功',
                  type: 'success'
                });
                this.centerDialogVisible=true;
              } else {
                this.$message.error(res);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //选择图片
      tirggerFile($event){
        var file = $event.target.files[0];
        var name = $event.target.files[0].name;
        this.ruleForm.filename = file;
        this.ruleForm.image = name;
      },
    },
    mounted: function () {
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
    width: 480px;
    text-align: left;
    margin-top: 50px;
  }

  .fs-16 {
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
    width: 92%;
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
