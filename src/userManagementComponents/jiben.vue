<template>
  <div>
    <el-row>
      <el-col style="width: 170px;margin-left: 5px" :span="3"><img style="height: 108px;width: 170px" src="http://www.zytech360.com/midai/images/jieqian.jpg"/></el-col>
      <el-col style="width: 170px;margin-left: 20px" :span="3"><img style="height: 108px;width: 170px" src="http://www.zytech360.com/midai/images/jieqian.jpg"/></el-col>
      <el-col style="width: 170px;margin-left: 20px" :span="3"><img style="height: 108px;width: 170px" src="http://www.zytech360.com/midai/images/jieqian.jpg"/></el-col>
    </el-row>
    <el-row>
    <el-col :span="3" style="width: 170px;text-align: center;margin-left: 5px;">1112</el-col>
    <el-col :span="3" style="width: 170px;text-align: center;margin-left: 20px;">222</el-col>
    <el-col :span="3" style="width: 170px;text-align: center;margin-left: 20px;">333</el-col>
    </el-row>
    <div class="jiben">
      <h3>基本信息</h3>
      <table >
        <tr><td>用户ID:111908719</td><td> 手机号：13718825134</td><td>  渠道：瑞恩小贷1</td><td>新户老户：老户</td><td>手机机型：meizue2</td><td>注册时间：2018.3.28 15:00：00</td><td>所属平台：天使借</td></tr>
        <tr><td>姓名：杨晶晶</td><td>身份证号：370831199012013670</td><td>是否是黑名单：否</td><td>年龄：27</td><td>婚姻状况：未婚</td><td>芝麻分：630</td><td>西瓜分：620</td></tr>
        <tr><td>性别：女</td><td>身份证有效期：20120220-20220220</td><td>身份证住址：广东省汕头市金平区金砂街道金美街3号406房</td><td>民族：汉</td></tr>
      </table>
      <h3>设备信息</h3>
      <table >
        <tr><td>操作系统:ios</td><td> 手机型号：iPhone9</td><td>  系统版本号：11.4</td><td>APP名称：天使借</td><td>APP版本：1.0.0</td></tr>
      </table>
      <h3>个人信息</h3>
      <table >
        <tr><td>学历:大专</td><td>婚姻情况：未婚</td><td>  居住地址：广东省汕头市金平区，金湖路107号3栋305</td><td>工作地址：汕头市金平区金凤路6号</td><td>职业：上班族</td></tr>
      </table>
      <h3>联系人</h3>
      <table >
        <tr><td>联系人1</td><td>联系人借款关系：父母</td><td>手机号：13718825134</td><td rowspan="2"><el-button @click="">手机通讯录</el-button></td></tr>
        <tr><td>联系人2</td><td>联系人借款关系：兄弟</td><td>手机号：18766562305</td></tr>
      </table>
      <h3>绑卡信息</h3>
      <table >
        <tr><td>银行名称：兴业银行</td><td>卡号：622908423034192813</td><td>预留电话：18624049766</td><td>类型：放款卡</td><td>绑卡时间：20181111 12:00:00</td></tr>
        <tr><td>银行名称：招商银行</td><td>卡号：622908423034192813</td><td>预留电话：18624049766</td><td>类型：快捷支付卡</td><td>绑卡时间：20181111 12:00:00</td></tr>
      </table>
      <h3>认证信息</h3>
      <table >
        <tr><td>身份证：已认证</td><td>身份证认证时间：2018-11-13 14:51:30</td></tr>
        <tr><td>人脸识别认证：已认证</td><td>人脸识别认证时间：2018-11-13 14:51:30</td></tr>
        <tr><td>运营商手机认证：已认证</td><td>运营商手机认证时间：2018-11-13 14:51:30</td></tr>
        <tr><td>支付宝认证：已认证</td><td>支付宝认证时间：2018-11-13 14:51:30</td></tr>
        <tr><td>绑卡：已认证</td><td>绑卡时间：2018-11-13 14:51:30</td></tr>
      </table>
      <el-button-group style="margin: 0 auto;width: 500px;display: block;margin-top: 40px;">
        <el-button class="la" type="danger">拉黑</el-button>
        <el-button class="guan" style="margin-left: 40px">关闭</el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {

      };
    },
    methods: {
    },
    mounted: function () {
      // this.getProductList();
    }
  }
</script>

<style scoped>
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
