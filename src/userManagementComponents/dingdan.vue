<template>
  <div>
    <div class="jiben">
      <h3>总平台信息</h3>
      <table >
        <tr><td>注册平台数：3</td><td>所有平台提交申请数：2</td><td>所有平台总放款数：1</td><td>所有平台拒绝次数：0</td><td>当前平台申请次数：1</td><td>当前平台放款次数：1</td><td>所有平台逾期次数：0</td></tr>
        <tr><td>所有平台催收次数：0</td><td>当前平台逾期次数：0</td><td>当前平台催收次数：1</td><td>是否是黑名单：否</td></tr>
      </table>
      <h3>天使借借款记录</h3>
      <table >
        <tr><td>操作系统:ios</td><td> 手机型号：iPhone9</td><td>  系统版本号：11.4</td><td>APP名称：天使借</td><td>APP版本：1.0.0</td></tr>
      </table>
      <table >
        <tr><td>学历:大专</td><td>婚姻情况：未婚</td><td>  居住地址：广东省汕头市金平区，金湖路107号3栋305</td><td>工作地址：汕头市金平区金凤路6号</td><td>职业：上班族</td></tr>
      </table>
      <h3>牛魔王借款记录</h3>
      <table >
        <tr><td>联系人1</td><td>联系人借款关系：父母</td><td>手机号：13718825134</td><td rowspan="2"><el-button @click="">手机通讯录</el-button></td></tr>
        <tr><td>联系人2</td><td>联系人借款关系：兄弟</td><td>手机号：18766562305</td></tr>
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
