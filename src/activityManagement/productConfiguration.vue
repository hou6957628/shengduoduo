<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>产品配置</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <div class="listContent">
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="sms">
          <span slot="label"><i class="el-icon-date"></i> 验证码</span>
          验证码
        </el-tab-pane>
        <el-tab-pane name="activity">
          <span slot="label"><i class="el-icon-date"></i> 活动配置</span>
          活动配置
        </el-tab-pane>
        <el-tab-pane name="loanSuper">
          <span slot="label"><i class="el-icon-date"></i> 待超显示配置</span>
          待超显示配置
        </el-tab-pane>
        <el-tab-pane name="Novel">
          <span slot="label"><i class="el-icon-date"></i> 小说显示配置</span>
          小说显示配置
        </el-tab-pane>
        <el-tab-pane name="Live">
          <span slot="label"><i class="el-icon-date"></i> 直播显示配置</span>
          直播显示配置
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        activeName: 'sms'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //用户基本信息
      getUserDetail(id) {
        axios({
          method: "POST",
          url:"http://"+this.baseUrl+"/user_center/admin/customer/find",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
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
            if (this.tianjiReport != null) {
              this.tianjiReport.tianjiUrl = res.data.body.tianjiReport.html;
            }
            this.idCard = res.data.body.idCard;
            this.idFace = res.data.body.idFace;
            this.linkMan = res.data.body.linkMan;
            this.authorizationStatus = res.data.body.authorizationStatus;
            this.basicInfo = res.data.body.basicInfo;
            this.selectProduct(this.id,this.productList);
          } else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //默认选择产品
      selectProduct(customerId,productList){
        if (productList != null && productList.size > 0) {
          for(var i=0;i<productList.length;i++){
            var pro = productList[i];
            if (pro.id == customerId) {
              this.isactive = i;
            }
          }
        }
      },
    },
    mounted: function () {
    },
  }
</script>

<style scoped>
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
    width: 800px;
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
