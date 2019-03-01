<template>
  <div>
    <el-row>
      <el-col style="width: 170px;margin-left: 5px" :span="3"><img style="height: 108px;width: 170px" :src="'http://39.105.217.251:31999/credit/api/down?file='+this.idCard.front"/></el-col>
      <el-col style="width: 170px;margin-left: 20px" :span="3"><img style="height: 108px;width: 170px" :src="'http://39.105.217.251:31999/credit/api/down?file='+this.idCard.back"/></el-col>
      <el-col style="width: 170px;margin-left: 20px" :span="3"><img style="height: 108px;width: 170px" :src="this.idFace.image"/></el-col>
    </el-row>
    <el-row>
    <el-col :span="3" style="width: 170px;text-align: center;margin-left: 5px;">身份证正面</el-col>
    <el-col :span="3" style="width: 170px;text-align: center;margin-left: 20px;">身份证正面</el-col>
    <el-col :span="3" style="width: 170px;text-align: center;margin-left: 20px;">人脸识别照片</el-col>
    </el-row>
    <div class="jiben">
      <h3>基本信息</h3>
      <table >
        <tr>
          <td>用户ID：{{this.cusCustomer.id}}</td><td> 手机号：{{this.cusCustomer.mobile}}</td><td>  渠道：{{this.cusCustomer.channelName==null?'--':this.cusCustomer.channelName}}</td>
          <td>新户老户：{{this.cusCustomer.reBorrow==1?'老户':'新户'}}</td><td>手机机型：{{this.cusCustomer.device==null?'--':this.cusCustomer.device}}</td>
          <td>注册时间：{{this.cusCustomer.createDate}}</td><td>所属平台：{{this.cusCustomer.productName}}</td>
        </tr>
        <tr>
          <td>姓名：{{this.cusCustomer.realName==null?'--':this.cusCustomer.realName}}</td><td>身份证号：{{this.cusCustomer.cardNumber==null?'--':this.cusCustomer.cardNumber}}</td>
          <td>是否是黑名单：{{this.cusCustomer.isBlackList==true?'是':'否'}}</td>
          <td>年龄：{{this.idCard.age==null?'--':this.idCard.age}}</td><td>婚姻状况：{{this.basicInfo.marital==null?'--':this.basicInfo.marital}}</td>
          <td>芝麻分：{{this.zhimaFen==null?'--':this.zhimaFen.zmScore}}</td>
          <td>西瓜分：{{this.tianjiReport==null?'--':this.tianjiReport.xgScore}}</td>
        </tr>
        <tr>
          <td>性别：{{this.idCard.gender==false?'男':'女'}}</td><td>身份证有效期：{{this.idCard.validDate==null?'--':this.idCard.validDate}}</td>
          <td>身份证住址：{{this.idCard.address==null?'--':this.idCard.address}}</td><td>民族：{{this.idCard.race==null?'--':this.idCard.race}}</td>
        </tr>
      </table>
      <h3>设备信息</h3>
      <table >
        <tr>
          <td> 手机型号：{{this.cusCustomer.device==null?'--':this.cusCustomer.device}}</td><td>系统版本号：</td><td>APP名称：{{this.cusCustomer.productName}}</td>
          <td>APP版本：</td>
        </tr>
      </table>
      <h3>个人信息</h3>
      <table >
        <tr>
          <td>学历：{{this.basicInfo.education}}</td><td>婚姻情况：{{this.basicInfo.marital}}</td><td>居住地址：{{this.basicInfo.addressDetail==null?'--':this.basicInfo.addressDetail}}</td>
          <td>工作地址：{{this.basicInfo.corpDetail==null?'--':this.basicInfo.corpDetail}}</td><td>职业：{{this.basicInfo.status==null?'--':this.basicInfo.status}}</td>
        </tr>
      </table>
      <h3>联系人</h3>
      <table >
        <template v-for="(item,index) in this.linkMan">
          <tr>
            <td>联系人{{index}}：{{item.name}}</td><td>联系人借款关系：{{item.relation}}</td><td>手机号：{{item.phoneNum}}</td>
            <td rowspan="2" v-if="index==0"><el-button @click="addressList">手机通讯录</el-button></td>
          </tr>
        </template>
      </table>
      <h3>绑卡信息</h3>
      <table >
        <tr v-for="(domain, index) in bankCard" :key="index">
          <td>银行名称：{{domain.bankName}}</td><td>卡号：{{domain.cardNumber}}</td><td>预留电话：{{domain.mobile}}</td><td>类型：放款卡</td><td>绑卡时间：{{domain.createDate}}</td>
        </tr>
      </table>
      <h3>认证信息</h3>
      <table >
        <template v-for="(item,index) in this.authorizationStatus">
          <tr v-if="index==0"><td>身份证：{{item.authorizationStatus}}</td><td>身份证认证时间：{{item.createDate}}</td></tr>
          <tr v-if="index==1"><td>人脸识别认证：{{item.authorizationStatus}}</td><td>人脸识别认证时间：{{item.createDate}}</td></tr>
          <tr v-if="index==2"><td>运营商手机认证：{{item.authorizationStatus}}</td><td>运营商手机认证时间：{{item.createDate}}</td></tr>
          <tr v-if="index==3"><td>支付宝认证：{{item.authorizationStatus}}</td><td>支付宝认证时间：{{item.createDate}}</td></tr>
          <tr v-if="index==4"><td>绑卡：{{item.authorizationStatus}}</td><td>绑卡时间：{{item.createDate}}</td></tr>
        </template>
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
        zhimaFen:{},
        bankCard:[],
        cusCustomer:{},
        tianjiReport:{},
        idCard:[],
        idFace:[],
        front:{},
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
      };
    },
    methods: {
      //通讯录
      addressList(){
        let id=this.id;
        this.$router.push({
          path: `/addressList/${id}`,
        });
      },
      //取消按钮
      resetForm(formName) {
        this.$router.push('/pendingApproval');
      },
      //用户基本信息
      getUserDetail(id) {
        axios({
          method: "POST",
          url:"http://"+this.baseUrl+"/user_center/admin/customer/find",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params: {
            id: id,
          }
        }).then((res) => {
          if (res.data.msgCd == 'ZYCASH-200') {
            this.productList = res.data.body.productList;
            this.zhimaFen = res.data.body.zhimaFen;
            this.bankCard = res.data.body.bankCard;
            this.cusCustomer = res.data.body.cusCustomer;
            this.tianjiReport = res.data.body.tianjiReport;
            this.idCard = res.data.body.idCard;
            this.idFace = res.data.body.idFace;
            this.linkMan = res.data.body.linkMan;
            this.authorizationStatus = res.data.body.authorizationStatus;
            this.basicInfo = res.data.body.basicInfo;
            if (res.data.body.basicInfo.marital==1) {
              this.basicInfo.marital='已婚';
            } else if (res.data.body.basicInfo.marital==2) {
              this.basicInfo.marital='未婚';
            } else if (res.data.body.basicInfo.marital==3) {
              this.basicInfo.marital='离异';
            } else {
              this.basicInfo.marital='--';
            }
            if (res.data.body.basicInfo.education==0) {
              this.basicInfo.education='初中及以下';
            } else if (res.data.body.basicInfo.education==1) {
              this.basicInfo.education='高中';
            } else if (res.data.body.basicInfo.education==2) {
              this.basicInfo.education='专科';
            } else if (res.data.body.basicInfo.education==3) {
              this.basicInfo.education='本科';
            } else if (res.data.body.basicInfo.education==4) {
              this.basicInfo.education='研究生';
            } else if (res.data.body.basicInfo.education==5) {
              this.basicInfo.education='博士生';
            } else if (res.data.body.basicInfo.education==6) {
              this.basicInfo.education='留学生';
            } else {
              this.basicInfo.education='--';
            }
            var _this=this;
            this.linkMan.forEach(function (item,index) {
              if (item.relation==0) {
                _this.linkMan[index].relation='父母';
              } else if (item.relation==1) {
                _this.linkMan[index].relation='配偶';
              } else if (item.relation==2) {
                _this.linkMan[index].relation='兄弟姐妹';
              } else if (item.relation==3) {
                _this.linkMan[index].relation='同事';
              } else if (item.relation==4) {
                _this.linkMan[index].relation='同学';
              } else if (item.relation==5) {
                _this.linkMan[index].relation='朋友';
              }
            });
            _this.authorizationStatus.forEach(function (item,index) {
              if (item.authorizationStatus==0) {
                _this.authorizationStatus[index].authorizationStatus='未认证';
              } else if (item.authorizationStatus==1) {
                _this.authorizationStatus[index].authorizationStatus='认证中';
              } else if (item.authorizationStatus==2) {
                _this.authorizationStatus[index].authorizationStatus='已认证';
              } else if (item.authorizationStatus==3) {
                _this.authorizationStatus[index].authorizationStatus='已失效';
              } else if (item.authorizationStatus==4) {
                _this.authorizationStatus[index].authorizationStatus='认证失败';
              }
            });
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
            this.$router.push('/pendingApproval');
          } else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
    },
    mounted: function () {
      this.id=this.$route.params.id;
      this.orderId2=this.$route.params.orderId;
      this.getUserDetail(this.id);
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
