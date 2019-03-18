<template>
    <div class="leftSilder">
      <div style="width: 165px;height: 70px"></div>
      <el-row class="tac">
        <el-col :span="24">
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b" router>
            <el-submenu index="1" style="padding-left:0 ;">
              <template style="padding-left: 5px" slot="title">
                <i class="el-icon-menu"></i>
                <span>金融产品配置</span>
              </template>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/financeProductList">金融产品列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2" style="padding-left:0 ;">
              <template style="padding-left: 5px" slot="title">
                <i class="el-icon-menu"></i>
                <span>商户管理</span>
              </template>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/merchantProductList">商户列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3" style="padding-left:0 ;">
              <template style="padding-left: 5px" slot="title">
                <i class="el-icon-menu"></i>
                <span>产品管理</span>
              </template>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/productProductList">产品列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4" style="padding-left:0 ;">
              <template style="padding-left: 5px" slot="title">
                <i class="el-icon-menu"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/userProductList">用户列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/blackList">黑名单列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/bankCardManagement">银行卡管理列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5" style="padding-left:0 ;">
              <template style="padding-left: 5px" slot="title">
                <i class="el-icon-menu"></i>
                <span>风控管理</span>
              </template>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/fieldList">字段管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/tagList">用户标签管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/ruleList">规则管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/collectionList">规则集管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/flowList">子流程管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/flowHeadList">总流程管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/flowLogList">风险命中列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6" style="padding-left:0 ;">
              <template style="padding-left: 5px" slot="title">
                <i class="el-icon-menu"></i>
                <span>贷后管理</span>
              </template>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/afterLoanManagement">逾期订单管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/afterLoanNoRepay">逾期未还订单</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/afterLoanRepayed">逾期已还订单</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/outsourcingOrderList">委外订单</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/outsourcingOrderRepayedList">委外已还</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/collectionTag">催收标签</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/callTypeTag">通话类型</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/collectionPersonManagement">催收人员管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/collectionGroupManagement">催收群组管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/collectionOrder">催收分单</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/collectionOrderList">催收已分订单</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/collectionTaskList">催收任务列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/collectionTaskFinishList">催回列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="7" style="padding-left:0 ;">
              <template style="padding-left: 5px" slot="title">
                <i class="el-icon-menu"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/roleList">角色列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/accountManagement">账户管理列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="8" style="padding-left:0 ;">
              <template style="padding-left: 5px" slot="title">
                <i class="el-icon-menu"></i>
                <span>渠道管理</span>
              </template>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/channelconnectionManagement">渠道链接列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/channelStatistics">渠道统计列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/channelCount">渠道统计中心</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/accountCenter">账户中心</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/rechargeCenter">充值中心</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="9" style="padding-left:0 ;">
              <template style="padding-left: 5px" slot="title">
                <i class="el-icon-menu"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/approvalCenter">审批中心</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/pendingApproval">待审批列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/pendingLoan">待放款列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/loanMade">已放款列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/orderList">订单管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/paymentHistory">还款记录列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/loanRecord">放款记录列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="10" style="padding-left:0 ;">
              <template style="padding-left: 5px" slot="title">
                <i class="el-icon-menu"></i>
                <span>额度管理</span>
              </template>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/amountFieldList">字段管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/amountTagList">标签管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/amountFlowList">流程管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/amountFlowLogList">命中列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="11" style="padding-left:0 ;">
              <template style="padding-left: 5px" slot="title">
                <i class="el-icon-menu"></i>
                <span>展期管理</span>
              </template>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/orderFieldList">字段管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/orderFlowList">流程管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/orderFlowLogList">命中列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="12" style="padding-left:0 ;">
              <template style="padding-left: 5px" slot="title">
                <i class="el-icon-menu"></i>
                <span>消息管理</span>
              </template>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/messageClassify">分类列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/smsMessage">短信消息</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/reminderMessage">提醒消息</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/popUpMessage">弹窗消息</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/pushMessage">推送消息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="13" style="padding-left:0 ;">
              <template style="padding-left: 5px" slot="title">
                <i class="el-icon-menu"></i>
                <span>消息配置</span>
              </template>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/messageConfigurationList">任务列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/messageRecord">日志列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
  .leftSilder {
    position: fixed;
    width: 165px;
    height: 100%;
    overflow-y: auto;
    top: 0;
    z-index: 100;
    box-shadow: 1px 0 5px rgba(0,0,0,.05);
    background-color: rgb(84, 92, 100);
    font-size: 18px;
  }
  .el-menu {
    border-right: 0;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;

  }
  .leftSilder .el-submenu__title , .leftSilder .el-menu-item{
    color: rgb(255, 255, 255);
    background-color: rgb(84, 92, 100);
    font-size: 16px;

  }
  .leftSilder .el-menu-item-group__title{
    display: none;
  }
  .el-submenu .el-menu-item{
     min-width: 160px;
  }
</style>
