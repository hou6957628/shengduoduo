<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/cashAudit' }">提现审核</el-breadcrumb-item>
      <el-breadcrumb-item>提现审核详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="bankBox">
      <p><span>编号：</span>{{(bankCard.id)?bankCard.id:'----'}}</p>
      <p><span>姓名：</span>{{bankCard.name}}</p>
      <p><span>手机号：</span>{{bankCard.mobile}}</p>
      <p><span>银行名称：</span>{{bankCard.bankName}}</p>
      <p><span>银行卡号：</span>{{(bankCard.cardNumber)?bankCard.cardNumber:'----'}}</p>
      <p><span>身份证号：</span>{{bankCard.idcardNum}}</p>
      <p><span>创建时间：</span>{{bankCard.createTime}}</p>
      <p><span>更新时间：</span>{{(bankCard.updateTime)?bankCard.updateTime:'----'}}</p>
    </div>
    <el-button-group class="btGrop">
      <el-button class="jie" type="primary" @click="editProduct()">解绑</el-button>
      <el-button @click="guan()" class="guan">关闭</el-button>
    </el-button-group>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    methods: {
      //根据id获取银行卡
      getBankCardById(id){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/flowPool/admin/casheAudit/get",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken,
          },
          params:{
            id:id,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.bankCard=res.data.body;
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      guan(){
        this.$router.go(-1);
      },
    },
    mounted:function () {
      this.id=this.$route.params.id;
      this.getBankCardById(this.id);
    },
    data() {
      return {
        bankCard: '',
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
