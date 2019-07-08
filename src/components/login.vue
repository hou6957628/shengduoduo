<template>
  <div class="container" id="app">
    <!--<p class="topClass"><img src="http://www.zytech360.com/images/daichaoLogo.png"/></p>-->
    <div class="contentBox">
      <div class="content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
          <el-form-item label="账号" prop="username" style="margin-bottom: 30px;font-size: 16px;">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="margin-bottom: 10px;font-size: 16px;">
            <el-input type="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
          </el-form-item>
          <el-form-item style="text-align: left">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="记住我的账号密码" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button class="btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
        <div style="clear: both;overflow: hidden;zoom: 1"></div>
      </div>

    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs';
  export default {
    data() {
      return {
        topBar:false,
        leftSilder:false,
        ruleForm: {
          username: '',
          password: '',
          type: true,
        },
        rules: {
          username: [
            {required: true, message: '请输入账户', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        },
      };
    },
    methods: {
      submitForm(formName) {
        var data =  qs.stringify({
          userName: this.ruleForm.username,
          password: this.ruleForm.password
        });
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios({
              // url:"http://"+this.baseUrl+"/operate/admin/user/login",
              url:"http://"+this.baseUrl+"/flowPool/admin/user/login",
              method:"post",
              data:data,
              headers:{
                'Content-Type':'application/x-www-form-urlencoded'
              }
            }).then((res)=>{
              if(res.data.msgCd=='ZYCASH-200'){
                let token=res.data.body.token;
                localStorage.token=res.data.body.token;
                this.$message({
                  message: '登录成功',
                  type: 'success'
                });
                this.$store.dispatch('setToken',token);
                this.$router.push({
                  path: `/userProductList`,
                });
                this.$forceUpdate();
              }else {
                this.$message.error(res.data.msgInfo);
              }

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  /*清除浮动 解决父级塌陷问题*/
  .container:after {
    content: "";
    display: block;
    clear: both;
  }
  .container {
    height: 960px;
    width: 100%;
    max-height: 100%;
    overflow-y: hidden;
    background-color: #0a93f7;
    background: url("http://jmyq.wzgeek.com/images/banner2.jpg") no-repeat no-repeat;
    background-size: cover;
    clear: both;
  }

  .container .topClass {
    width: 600px;
    margin: 0 auto;
    margin-top: 100px;
    margin-bottom: 20px;
    font-size: 20px;
  }

  .container .topClass img {
    display: inline-block;
    width: 800px;
    height: auto;
    margin: 0 auto;
  }

  .contentBox {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -200px;
    border-radius: 4px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    background-color: #fff;
    width: 500px;
    height: 400px;
    box-shadow: 0 2px 10px #999;
    -moz-box-shadow: #999 0 2px 10px;
    -webkit-box-shadow: #999 0 2px 10px;
  }

  .demo-ruleForm {
    width: 400px;
    margin: 0 auto;
    text-align: center;
    margin-top: 100px;
  }

  .contentBox .el-form-item__content {
    height: 60px;
    line-height: 60px;
  }

  .contentBox .btn {
    width: 120px;
    height: 40px;
    font-size: 16px;
    letter-spacing: 2px;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    margin-top: 40px;
  }
  .contentBox .btn:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
</style>
