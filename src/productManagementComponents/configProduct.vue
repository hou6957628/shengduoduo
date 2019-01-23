<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/productList' }">产品中心</el-breadcrumb-item>
      <el-breadcrumb-item>产品列表</el-breadcrumb-item>
      <el-breadcrumb-item>产品配置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="ruleForm">
      <span v-for="item in modeList">
          <el-button :id="item.module" @click="handleClick(item.module,item.moduleName)" style="width: 150px;margin-bottom: 20px;">{{item.moduleName}}</el-button>
      </span>
      <p style="padding: 20px 0;text-align: center;font-size: 18px; width: 740px;background-color: #fff;">{{moduleAttribute[0].moduleName}}配置</p>
      <div v-for="(item,index) in moduleAttribute">
        <div class="jiegou" v-if="ruleForm.mode==item.module" style="width: 700px">
          <el-form-item :label="item.nameText" prop="nameText">
            <el-input v-model="item.value"></el-input>
          </el-form-item>
      </div>
      </div>
        <el-form-item label-width="340px">
          <el-button type="primary" style="display: block" @click="submitForm(moduleAttribute[0].module,moduleAttribute[0].moduleName)">保存</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        modeList:[ ],
        moduleAttribute:[
          {mode:'',moduleName:'',name:'',nameText:'',value: '',valueId: '',}
        ],
        ruleForm: {
          mode:'',
          moduleName:'',
          name:'',
          nameText:"",
        },
        rules: {
          cpaPrice: [
            { required: true, message: 'CPA单价', trigger: 'blur' },
            { min: 1, max: 5, message: '', trigger: 'blur' }
          ],
        },
      };
    },
    methods: {
      loaderModelTable() {
        axios({
          method:"post",
          url:"http://"+this.baseUrl+"/operate/admin/productManage/loaderModelTable",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.modeList= res.data.body.list;
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      handleClick(key,id) {
        this.ruleForm.mode=key;
        axios({
          method:"post",
          url:"http://"+this.baseUrl+"/operate/admin/productManage/loaderModel",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            merchantId:this.merchantId,
            productId:this.id,
            mode:key,
            modeName:id
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.moduleAttribute= res.data.body.list;
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      submitForm(module,moduleName){
        var data  = {
          'merchantId': this.merchantId,
          'productId': this.id,
          'module': module,
          'moduleName': moduleName,
          'modValues': this.moduleAttribute,
        };
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/operate/admin/productManage/saveModel",
          headers:{
            'Content-Type':'application/json',
            'Authorization': localStorage.token
          },
          data: JSON.stringify(data),
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.$message({
              message: '配置成功',
              type: 'success'
            });
            this.$router.push('/productProductList');
          }else if(res.data.msgCd=='ZYCASH-SUPERMARKET-1009'){
            this.$message.error(res.data.msgInfo);
          } else {
            this.$message.error(res);
          }
        })
      }
    },
    mounted:function () {
      this.id=this.$route.params.id;
      this.merchantId=this.$route.params.merchantId;
      this.handleClick('Face','face++');
      this.loaderModelTable();
    },
  }
</script>

<style scoped>
  /*.content .el-form-item{*/
    /*margin-bottom: 0;*/
  /*}*/
  .el-form-item__content{
    line-height: 30px;
  }
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
  .jiegou{
    background-color: #fff;
    padding-right: 40px;
    padding-bottom: 2px;
    padding-top: 20px;
  }
</style>
