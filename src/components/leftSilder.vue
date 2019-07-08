<template>
    <div class="leftSilder">
      <div style="width: 175px;height: 70px"></div>
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
                <span>用户列表</span>
              </template>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/userProductList">用户列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2" style="padding-left:0 ;">
              <template style="padding-left: 5px" slot="title">
                <i class="el-icon-info"></i>
                <span>提现审核</span>
              </template>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/cashAudit">提现审核</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3" style="padding-left:0 ;">
              <template style="padding-left: 5px" slot="title">
                <i class="el-icon-picture"></i>
                <span>银行卡管理</span>
              </template>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/bankCardManagement">银行卡管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4" style="padding-left:0 ;">
              <template style="padding-left: 5px" slot="title">
                <i class="el-icon-share"></i>
                <span>渠道管理</span>
              </template>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/channelconnectionManagement">渠道链接列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/channelCount">渠道统计列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/accountCenter">账户中心</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5" style="padding-left:0 ;">
              <template style="padding-left: 5px" slot="title">
                <i class="el-icon-setting"></i>
                <span>产品配置</span>
              </template>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/productConfiguration">产品配置</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/productConfiguration1">产品配置1</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6" style="padding-left:0 ;">
              <template style="padding-left: 5px" slot="title">
                <i class="el-icon-goods"></i>
                <span>活动管理</span>
              </template>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/activityManagement">活动管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/activityBannerList">活动Banner管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/liveBroadcastList">直播管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="7" style="padding-left:0 ;">
              <template style="padding-left: 5px" slot="title">
                <i class="el-icon-tickets"></i>
                <span>金币抽大奖</span>
              </template>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/goldCoinList">金币抽大奖</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="8" style="padding-left:0 ;">
              <template style="padding-left: 5px" slot="title">
                <i class="el-icon-tickets"></i>
                <span>兑换审核</span>
              </template>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/exchangeAudit">兑换审核</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="9" style="padding-left:0 ;">
              <template style="padding-left: 5px" slot="title">
                <i class="el-icon-bell"></i>
                <span>兑换订单</span>
              </template>
              <el-menu-item-group style="padding-left: 5px">
                <el-menu-item index="/exchangeAuditFinish">兑换订单</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="10" style="padding-left:0 ;">
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
            <el-submenu index="11" style="padding-left:0 ;">
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
      },
    }
  }
</script>

<style>
  .leftSilder {
    position: fixed;
    width: 182px;
    height: 100%;
    min-height: 100%;
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
