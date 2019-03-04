<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/smsMessage' }">短信消息</el-breadcrumb-item>
      <el-breadcrumb-item>创建短信</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
      <el-form-item style="margin-top: 20px;width: 480px" label="选择所属APP:" prop="App">
        <el-select style="width: 320px" v-model="ruleForm.App" value-key="id" placeholder="请选择" @change="selectChange1($event,productList)">
          <el-option
            v-for="item in productList"
            :key="item.productId"
            :label="item.productName"
            :value="item.productId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称:" prop="classifyName">
        <el-input v-model="ruleForm.classifyName"></el-input>
      </el-form-item>
      <el-form-item style="margin-top: 20px" label="请选择分类:" prop="classifyId">
        <el-select v-model="ruleForm.classifyId" value-key="id" placeholder="请选择" @change="selectChange1($event,fenList)">
          <el-option
            v-for="item in fenList"
            :key="item.id"
            :label="item.classifyName"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button @click="toAddProduct()" type="primary" plain>添加分类</el-button>
      </el-form-item>
      <el-form-item label="请输入备注:" prop="description">
        <el-input type="textarea" :rows="4" v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="请输入短信内容:" prop="content">
        <el-input type="textarea" :rows="4" v-model="ruleForm.content"></el-input>
      </el-form-item>
      <el-form-item label="短信ID:" prop="noteId">
        <el-input v-model="ruleForm.noteId"></el-input>
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
          classifyName: '',
          classifyId: '',
          App:'',
          description:'',
          content:'',
          noteId:'',
          modeCode:'',
          popupCount:'',
          id:'',
          position:'',
        },
        rules: {
          App: [
            {required: true, message: '选择所属App', trigger: 'change'}
          ],
          classifyName: [
            {required: true, message: '请填写名称', trigger: 'blur'}
          ],
          classifyId: [
            {required: true, message: '请选择分类', trigger: 'blur' }
          ],
          description: [
            {required: true, message: '请输入备注', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入短信内容', trigger: 'change'}
          ],
          noteId: [
            { required: true, message: '请输入短信ID', trigger: 'blur' }
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
        productList:{
          productId: '',
          productName: '',
        },
        fenList:{
          productId: '',
          productName: '',
        },
      };
    },
    methods: {
      /**
       * 获取选择所属APP
       */
      getFenList(){
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
            this.productList.unshift({productId: null, productName: '全部产品'});
          }else if(res.data.msgCd=='ZYCASH-1009'){
            this.$message.error(res.data.msgInfo);
          }
          else {
            this.$message.error(res);
          }
        })
      },
      //提交按钮
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var param = new FormData();
            param.append('id', this.ruleForm.id);
            param.append('classifyId', this.ruleForm.classifyId);
            param.append('classifyName', this.ruleForm.classifyName);
            param.append('name', this.ruleForm.name);
            param.append('description', this.ruleForm.description);
            param.append('modeId', this.ruleForm.modeId);
            param.append('modeName', this.ruleForm.modeName);
            param.append('modeCode', this.ruleForm.modeCode);
            param.append('position', this.ruleForm.position);
            param.append('noteId', this.ruleForm.noteId);
            param.append('productId', this.ruleForm.productId);
            param.append('productName', this.ruleForm.productName);
            param.append('productCode', this.ruleForm.productCode);
            param.append('popupCount', this.ruleForm.popupCount);
            param.append('content', this.ruleForm.content);
            axios({
              method: "POST",
              url: "http://"+this.baseUrl+"/message/admin/message/insert",
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
                this.$router.push('/smsMessage');
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
      //取消按钮
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //获取请选择分类
      getProductList1(){
        axios({
          method: "POST",
          url: "http://"+this.baseUrl+"/message/admin/message_classify/find",
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
            this.fenList = res.data.body.list;
            // for(var i=0;i<this.electData2.length;i++){
            //   this.products.push({
            //     id:this.electData2[i].id,
            //     productName:this.electData2[i].productName
            //   });
            //   this.$forceUpdate();
            //   console.log(this.products);
            // }
          } else {
            this.$message.error(res.data.msgInfo);
          }
        })
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
    },
    mounted: function () {
      this.getFenList();
      this.getProductList1();
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
