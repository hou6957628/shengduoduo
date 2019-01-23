<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/bankCardManagement' }">银行卡管理列表</el-breadcrumb-item>
      <el-breadcrumb-item>银行卡详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="bankBox">
      <p><span>编号：</span>Ying2111</p>
      <p><span>卡号：</span>6212261209001677695</p>
      <p><span>类型：</span>储蓄卡</p>
      <p><span>银行名称：</span>中国建设银行</p>
      <p><span>开户支行：</span>123123</p>
      <p><span>预留手机号：</span>13718825134</p>
      <p><span>所属应用：</span>天使借</p>
      <p><span>是否是放款卡：</span>是</p>
      <p><span>是否是快捷支付：</span>是</p>
      <p><span>创建时间：</span>2018-12-06 17:31:47</p>
      <p><span>更新时间：</span>2018-12-06 17:31:47</p>
      <p><span>备注：</span>1371882512312323134</p>
      <p><span>用户姓名：</span>李辉</p>
      <p><span>身份证号：</span>341224198207307817</p>
      <p><span>注册手机号：</span>13718825134</p>
    </div>
    <el-button-group class="btGrop">
      <el-button class="jie" type="primary">解绑</el-button>
      <el-button @click="guan()" class="guan">关闭</el-button>
    </el-button-group>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    methods: {
      guan(){
        this.$router.push({
          path: `/bankCardManagement`,
        });
      },
    },
    mounted:function () {
    },
    data() {
      return {
        finProduct: '',
      }
    }
  }
</script>

<style scoped>

  .content {
    padding-left: 200px;
    padding-top: 80px;
  }
  .fs-16{
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .operationContent .searchContent{
    margin-left:5px;
    width: 200px;
    margin-right: 30px;
  }
  .paginationBox{
    margin-top: 20px;
    font-size: 18px;
    margin-bottom: 40px;
  }
  .bankBox p{
    height: 35px;
    line-height: 35px;
  }
  .bankBox p span{
    display: inline-block;
    width: 140px;
  }
  .btGrop{
    display: block;
    width: 500px;
    margin: 0 auto;
    margin-top: 50px;
  }
  .jie{
    display: inline-block;
    font-size: 20px;
    padding: 15px 40px;
  }
  .content .guan{
    display: inline-block;
    font-size: 20px;
    padding: 15px 40px;
    margin-left: 40px;
  }
</style>
