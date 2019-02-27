<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/smsMessage' }">短信消息</el-breadcrumb-item>
      <el-breadcrumb-item>弹窗详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
      <el-form-item label="名称:" prop="name">
        <el-input disabled="disabled" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="分类:" prop="classification">
        <el-input disabled="disabled" v-model="ruleForm.classification"></el-input>
      </el-form-item>
      <el-form-item label="弹窗类型:" prop="popup">
        <el-input disabled="disabled" v-model="ruleForm.popup"></el-input>
      </el-form-item>
      <el-form-item label="备注:" prop="desc">
        <el-input disabled="disabled" type="textarea" :rows="4" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="文案内容:" prop="content">
        <el-input disabled="disabled" type="textarea" :rows="4" v-model="ruleForm.content"></el-input>
      </el-form-item>
      <el-form-item label="弹窗图:" prop="popImg">
        <el-button type="primary" @click="previewBtn()" style="text-align: center" plain>预览图片</el-button>
      </el-form-item>
      <el-form-item label="位置:" prop="position">
        <el-input disabled="disabled" type="textarea" :rows="4" v-model="ruleForm.position"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 200px" type="primary" @click="goBack()">返回</el-button>
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
          desc: '',
          popup: '',
          popImg: '',
          classification: '',
          content: '',
          position: '',
        },
        rules: {
          name: [
            {required: true, message: '名称', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请输入备注', trigger: 'change'}
          ],
          classification: [
            {required: true, message: '分类', trigger: 'blur' }
          ],
          content: [
            {required: true, message: '请输入短信内容', trigger: 'blur'}
          ],
        },
      };
    },
    methods: {
      //取消按钮
      goBack() {
        this.$router.go(-1);
      },
      //预览图片
      previewBtn(){},
      //获取短信详情
      getProductList(){
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
          } else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
    },
    mounted: function () {
      this.getProductList();
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
