<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/userProductList' }">用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>用户详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <div class="listContent">
      <router-link @click.native="index(0)" :class="activeIndex==0?'active':''" to="basicInfo" tag="li">基本信息</router-link>
      <router-link @click.native="index(1)" :class="activeIndex==1?'active':''" to="redEnvelopesAccount" tag="li">红包账户</router-link>
      <router-link @click.native="index(2)" :class="activeIndex==2?'active':''" to="goldCoinAccount" tag="li">金币账户</router-link>
      <router-link @click.native="index(3)" :class="activeIndex==3?'active':''" to="loanOperationRecord" tag="li">待超操作记录</router-link>
      <router-link @click.native="index(4)" :class="activeIndex==4?'active':''" to="withdrawalsRecord" tag="li">提现记录</router-link>
      <router-link @click.native="index(5)" :class="activeIndex==5?'active':''" to="exchangeRecords" tag="li">兑换记录</router-link>
      <router-link @click.native="index(6)" :class="activeIndex==6?'active':''" to="inviteUsers" tag="li">已邀请用户</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        activeIndex:0,
      };
    },
    methods: {
      index(data) {
        this.activeIndex=data;
      },
    },
    mounted: function () {
    },
  }
</script>

<style scoped>
  .listContent .active{
    color: #ffffff;
    background-color: #0abcfe;
    border: 1px solid #0fbeff;
  }
  .ddd{
    display: inline-block;
    padding: 10px 15px;
    margin-right: 10px;
    margin-left: 5px;
    font-size: 16px;
    color: #ffffff;
    background-color: #118efe;
    border: 1px solid #0f91ff;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
  }
  .ddd:hover{
    background-color: #0abcfe;
    border: 1px solid #0fbeff;
  }
  .listBox{
    display: inline-block;
    float: left;
    padding: 15px 30px;
    margin: 0 5px;
    font-size: 17px;
    color: #000;
    background-color: #ffffff;
    border: 1px solid #dcdfe6;
    cursor: pointer;
  }
  .listBox:hover{
    border: 1px solid #b5b5b5;
    -moz-box-shadow:2px 6px 15px #b5b5b5;
    -webkit-box-shadow:2px 6px 15px #b5b5b5;
    box-shadow:2px 6px 15px #b5b5b5;
  }
  .content {
    padding-left: 200px;
    padding-top: 80px;
  }
  .listContent{
    clear: both;
    height: 80px;
  }
  .listContent li{
    display: inline-block;
    padding: 10px 15px;
    margin-right: 10px;
    margin-left: 5px;
    font-size: 16px;
    color: #ffffff;
    background-color: #118efe;
    border: 1px solid #0f91ff;
    border-radius: 5px;
    cursor: pointer;
  }
  .listContent li:hover{
    color: #ffffff;
    background-color: #0abcfe;
    border: 1px solid #0fbeff;
  }
  .fs-16 {
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .addclass{
    color: #67c23a;
    background: #f0f9eb;
    border-color: #c2e7b0;
  }
  .line{
    width: 95%;
    height: 1px;
    background-color: #b0b0b0;
    margin-bottom: 30px;
    margin-left: 5px;
  }
</style>
