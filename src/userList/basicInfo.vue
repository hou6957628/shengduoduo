<template>
  <div>
    <div class="jiben">
      <h3>基本信息</h3>
      <table>
        <tr>
          <td>用户ID：{{this.cusCustomer.id}}</td>
          <td>用户姓名：{{this.cusCustomer.user}}</td>
          <td>手机号：{{this.cusCustomer.mobile}}</td>
          <td>渠道：{{this.cusCustomer.subChannelName}}</td>
          <td>新户老户：{{this.cusCustomer.reBorrow==1?'老户':'新户'}}</td>
          <td>手机机型：{{this.cusCustomer.phoneModel}}</td>
          <td>注册时间：{{this.cusCustomer.createDate}}</td>
          <td>所属平台：{{this.cusCustomer.productName}}</td>
        </tr>
        <tr>
          <td>性别：{{this.cusCustomer.sex}}</td>
          <td>红包账户：{{this.cusCustomer.redEnvelopesBalance}}</td>
          <td>金币：{{this.cusCustomer.goldBalance}}</td>
          <td>邀请人手机号 ：{{this.cusCustomer.recommendMobile}}</td>
          <td>身份证号：{{this.cusCustomer.recommendMobile}}</td>
        </tr>
      </table>
      <h3>设备信息</h3>
      <table >
        <tr>
          <td>手机品牌:{{this.cusCustomer.deviceType==null?'--':this.cusCustomer.deviceType}}</td>
          <td>手机型号:{{this.cusCustomer.device==null?'--':this.cusCustomer.device}}</td>
          <td>手机系统版本号:{{this.cusCustomer.systemVersion==null?'--':this.cusCustomer.systemVersion}}</td>
          <td>APP版本:{{this.cusCustomer.appVersion}}</td>
        </tr>
      </table>
      <h3>收件信息</h3>
      <table >
        <tr>
          <td>地址：{{this.cusCustomer.goldBalance}}</td><td>收件人手机号：{{this.cusCustomer.goldBalance}}</td><td>收件人电话号码：{{this.cusCustomer.goldBalance}}</td>
        </tr>
      </table>
      <h3 v-if="!this.bankCard">绑卡信息</h3>
      <table v-if="!this.bankCard">
        <tr v-for="(item ,index) in this.bankCard">
          <td>银行名称：{{item.bankName}}</td><td>卡号：{{item.cardNumber}}</td><td>预留电话：{{item.mobile}}</td>
          <td>类型 ：{{item.type?"储蓄卡":"信用卡"}}</td><td>绑卡时间：{{item.createDate}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        productList:[],
        id:null,
        linkMan:[
          {
            name:'',
            relation:"",
            phoneNum:""
          }
        ],
        authorizationStatus:[],
        basicInfo:{
          marital:'',
          education:'',
        },
        cusCustomer:{},
        bankCard:{},
      };
    },
    methods: {
      //取消按钮
      resetForm(formName) {
        this.$router.go(-1);
      },
      //用户基本信息
      getUserDetail(id) {
        axios({
          method: "POST",
          url:"http://"+this.baseUrl+"/flowPool/admin/customer/find",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
          },
          params: {
            id: id,
          }
        }).then((res) => {
          if (res.data.msgCd == 'ZYCASH-200') {
            this.cusCustomer=res.data.body.cusCustomer;
          } else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //绑卡信息
      getBankCard(id){
        axios({
          method: "post",
          url:"http://"+this.baseUrl+"/flowPool/admin/bank/getBankCardBycustomerId",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
          },
          params: {
            customerId: id,
          }
        }).then((res) => {
          if (res.data.msgCd == 'ZYCASH-200') {
            this.bankCard=res.data.body;
          } else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //拉黑
      addBlack() {
        axios({
          method: "POST",
          url:"http://"+this.baseUrl+"/user_center/admin/black/setBlack",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params: {
            customerId: this.id,
            description: '后台系统手动拉黑',
          }
        }).then((res) => {
          if (res.data.msgCd == 'ZYCASH-200') {
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            this.$router.go(-1);
          } else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //移除黑名单
      removeBlack() {
        axios({
          method: "POST",
          url:"http://"+this.baseUrl+"/user_center/admin/customer/deleteBlack",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params: {
            id: this.id,
          }
        }).then((res) => {
          if (res.data.msgCd == 'ZYCASH-200') {
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            this.$router.go(-1);
          } else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
    },
    mounted: function () {
      this.id=this.$store.state.userId;
      this.getBankCard(this.id);
      this.getUserDetail(this.id);

    },
    filters:{
      genderFalse:function(arg1){
        if(arg1==true){
          var result = "女";
          return result;
        }else if(arg1==false){
          var result = "男";
          return result;
        } else {
          return '--';
        }
      }
    }
  }
</script>

<style scoped >
  .jiben{
    margin-top: 20px;
    font-size: 14px;
    margin-bottom: 40px;
  }
  h3{
    margin-top: 15px;
  }
  .la{
    padding: 15px 40px;
    font-size: 20px;
    text-align: center;
    margin: 0 auto;
  }
  .guan{
    padding: 15px 40px;
    font-size: 20px;
    text-align: center;
    margin-left: 40px;
  }
  table,table tr th, table tr td { border:1px solid #838383; }
  table { width: 95%; min-height: 40px; line-height: 40px; text-align: center; border-collapse: collapse; padding:10px 5px;margin-top: 20px}
</style>
