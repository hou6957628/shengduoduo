import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/home'
import axios from 'axios'
//用户列表
import userProductList from '@/userList/userProductList'
import userDetail from '@/userList/userDetail'
import basicInfo from '@/userList/basicInfo'
import inviteUsers from '@/userList/inviteUsers'
import exchangeRecords from '@/userList/exchangeRecords'
import goldCoinAccount from '@/userList/goldCoinAccount'
import loanOperationRecord from '@/userList/loanOperationRecord'
import redEnvelopesAccount from '@/userList/redEnvelopesAccount'
import withdrawalsRecord from '@/userList/withdrawalsRecord'
//提现审核
import cashAudit from '@/cashAudit/cashAudit'
import cashDetail from '@/cashAudit/cashDetail'
//兑换审核
import exchangeAudit from '@/cashAudit/exchangeAudit'
//兑换已发货列表
import exchangeAuditFinish from '@/cashAudit/exchangeAuditFinish'
//活动管理
import activityManagement from '@/activityManagement/activityManagement'
import addActivity from '@/activityManagement/addActivity'
import activityDetail from '@/activityManagement/activityDetail'
import productConfiguration from '@/activityManagement/productConfiguration'
import productConfiguration1 from '@/activityManagement/productConfiguration1'
//渠道管理
import channelconnectionManagement from '@/channelManagementComponents/channelconnectionManagement'
import addChannel from '@/channelManagementComponents/addChannel'
import editChannel from '@/channelManagementComponents/editChannel'
import channelCountDetail from '@/channelManagementComponents/channelCountDetail'
import editChannelStatistics from '@/channelManagementComponents/editChannelStatistics'
import editChannelStatisticsDetail from '@/channelManagementComponents/editChannelStatisticsDetail'
import channelCount from '@/channelManagementComponents/channelCount'
import accountCenter from '@/channelManagementComponents/accountCenter'
import rechargeCenter from '@/channelManagementComponents/rechargeCenter'
//银行卡列表
import bankCardManagement from '@/bankCard/bankCardManagement'
import bankCardDetail from '@/bankCard/bankCardDetail'
//金币抽大奖
import goldCoinList from '@/goldCoinList/goldCoinList'
import goldCoinDetail from '@/goldCoinList/goldCoinDetail'
import addGoldCoin from '@/goldCoinList/addGoldCoin'
import goldCoinRecord from '@/goldCoinList/goldCoinRecord'
//活动banner
import activityBannerList from '@/activityManagement/activityBannerList'
import addActivityBanner from '@/activityManagement/addActivityBanner'
import activityBannerDetail from '@/activityManagement/activityBannerDetail'
//直播
import liveBroadcastList from '@/activityManagement/liveBroadcastList'
import addLiveBroadcast from '@/activityManagement/addLiveBroadcast'
import liveBroadcastDetail from '@/activityManagement/liveBroadcastDetail'
//消息
//消息管理-分类列表
import messageClassify from '@/messageConfigurationComponents/messageClassify'
//消息管理-短信消息
import smsMessage from '@/messageConfigurationComponents/SMS/smsMessage'
import createSMS from '@/messageConfigurationComponents/SMS/createSMS'
import editSMS from '@/messageConfigurationComponents/SMS/editSMS'
import detailSMS from '@/messageConfigurationComponents/SMS/detailSMS'
//消息管理-提醒消息
import reminderMessage from '@/messageConfigurationComponents/reminder/reminderMessage'
import createReminderMessage from '@/messageConfigurationComponents/reminder/createReminderMessage'
import editReminderMessage from '@/messageConfigurationComponents/reminder/editReminderMessage'
import detailReminderMessage from '@/messageConfigurationComponents/reminder/detailReminderMessage'
//消息管理-弹窗消息
import popUpMessage from '@/messageConfigurationComponents/popUp/popUpMessage'
import createPopUpMessage from '@/messageConfigurationComponents/popUp/createPopUpMessage'
import editPopUpMessage from '@/messageConfigurationComponents/popUp/editPopUpMessage'
import detailPopUpMessage from '@/messageConfigurationComponents/popUp/detailPopUpMessage'
//消息管理-推送消息
import pushMessage from '@/messageConfigurationComponents/push/pushMessage'
import createPushMessage from '@/messageConfigurationComponents/push/createPushMessage'
import editPushMessage from '@/messageConfigurationComponents/push/editPushMessage'
import detailPushMessage from '@/messageConfigurationComponents/push/detailPushMessage'
//消息配置
import messageConfigurationList from '@/messageManagementComponents/messageConfigurationList'
import messageRecord from '@/messageManagementComponents/messageRecord'
import noticeMessage from '@/messageManagementComponents/noticeMessage'
import marketingMessage from '@/messageManagementComponents/marketingMessage'
import triggerMessage from '@/messageManagementComponents/triggerMessage'
import editTriggerMessage from '@/messageManagementComponents/editTriggerMessage'
import editNoticeMessage from '@/messageManagementComponents/editNoticeMessage'
import editMarketingMessage from '@/messageManagementComponents/editMarketingMessage'
import taskDetail from '@/messageManagementComponents/taskDetail'
import techMessage from '@/messageManagementComponents/techMessage'
import editTechMessage from '@/messageManagementComponents/editTechMessage'
Vue.use(Router);
// http request 拦截器
axios.interceptors.request.use(
  config => {
    // if (localStorage.token=='') {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    //   Router.replace({
    //     path: '/login'
    //   })
    // }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT);
          Router.replace({
            path: '/login',
            query: {redirect: Router.currentRoute.fullPath}
          })
      }
    }
    return Promise.reject(error.response)   // 返回接口返回的错误信息
  });

//测试环境
Vue.prototype.baseUrl="47.93.234.167:31999";
//正式环境
// Vue.prototype.baseUrl="60.205.216.141";

const vueRouter = new Router({
  // mode: 'history',
  routes: [
    {
      path: '*',
      name: 'login1',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        requireAuth: true
      },
      component: home
    },
    {
      path: '/userProductList',
      name: 'userProductList',
      meta: {
        requireAuth: true
      },
      component: userProductList
    },
    {
      path: '/cashAudit',
      name: 'cashAudit',
      meta: {
        requireAuth: true
      },
      component: cashAudit
    },
    {
      path: '/exchangeAudit',
      name: 'exchangeAudit',
      meta: {
        requireAuth: true
      },
      component: exchangeAudit
    },
    {
      path: '/exchangeAuditFinish',
      name: 'exchangeAuditFinish',
      meta: {
        requireAuth: true
      },
      component: exchangeAuditFinish
    },
    {
      path: '/activityManagement',
      name: 'activityManagement',
      meta: {
        requireAuth: true
      },
      component: activityManagement
    },
    {
      path: '/addActivity',
      name: 'addActivity',
      meta: {
        requireAuth: true
      },
      component: addActivity
    },
    {
      path: '/productConfiguration',
      name: 'productConfiguration',
      meta: {
        requireAuth: true
      },
      component: productConfiguration
    },
    {
      path: '/productConfiguration1',
      name: 'productConfiguration1',
      meta: {
        requireAuth: true
      },
      component: productConfiguration1
    },
    {
      path: '/userDetail',
      name: 'userDetail',
      redirect:'basicInfo',
      meta: {
        requireAuth: true
      },
      children:[
        {
          path:"/basicInfo",
          component:basicInfo
        },
        {
          path:"/inviteUsers",
          component:inviteUsers
        },
        {
          path:"/exchangeRecords",
          component:exchangeRecords
        },
        {
          path:"/goldCoinAccount",
          component:goldCoinAccount
        },
        {
          path:"/loanOperationRecord",
          component:loanOperationRecord
        },
        {
          path:"/redEnvelopesAccount",
          component:redEnvelopesAccount
        },
        {
          path:"/withdrawalsRecord",
          component:withdrawalsRecord
        },
      ],
      component: userDetail
    },
    {
      path: '/channelconnectionManagement',
      name: 'channelconnectionManagement',
      meta: {
        requireAuth: true
      },
      component: channelconnectionManagement
    },
    {
      path: '/addChannel',
      name: 'addChannel',
      meta: {
        requireAuth: true
      },
      component: addChannel
    },
    {
      path: '/editChannel/:id',
      name: 'editChannel',
      meta: {
        requireAuth: true
      },
      component: editChannel
    },
    {
      path: '/channelCount',
      name: 'channelCount',
      meta: {
        requireAuth: true
      },
      component: channelCount
    },
    {
      path: '/accountCenter',
      name: 'accountCenter',
      meta: {
        requireAuth: true
      },
      component: accountCenter
    },
    {
      path: '/channelCountDetail/:productCode/:parentChannelCode/:subChannelCode',
      name: 'channelCountDetail',
      meta: {
        requireAuth: true
      },
      component: channelCountDetail
    },
    {
      path: '/editChannelStatistics/:id',
      name: 'editChannelStatistics',
      meta: {
        requireAuth: true
      },
      component: editChannelStatistics
    },
    {
      path: '/editChannelStatisticsDetail/:id',
      name: 'editChannelStatisticsDetail',
      meta: {
        requireAuth: true
      },
      component: editChannelStatisticsDetail
    },
    {
      path: '/rechargeCenter/:channelName/:id',
      name: 'rechargeCenter',
      meta: {
        requireAuth: true
      },
      component: rechargeCenter
    },
    {
      path: '/bankCardManagement',
      name: 'bankCardManagement',
      meta: {
        requireAuth: true
      },
      component: bankCardManagement
    },
    {
      path: '/bankCardDetail',
      name: 'bankCardDetail',
      meta: {
        requireAuth: true
      },
      component: bankCardDetail
    },
    {
      path: '/addGoldCoin',
      name: 'addGoldCoin',
      meta: {
        requireAuth: true
      },
      component: addGoldCoin
    },
    {
      path: '/goldCoinDetail/:id',
      name: 'goldCoinDetail',
      meta: {
        requireAuth: true
      },
      component: goldCoinDetail
    },
    {
      path: '/goldCoinList',
      name: 'goldCoinList',
      meta: {
        requireAuth: true
      },
      component: goldCoinList
    },
    {
      path: '/goldCoinRecord/:id',
      name: 'goldCoinRecord',
      meta: {
        requireAuth: true
      },
      component: goldCoinRecord
    },
    {
      path: '/activityDetail',
      name: 'activityDetail',
      meta: {
        requireAuth: true
      },
      component: activityDetail
    },
    {
      path: '/cashDetail/:id',
      name: 'cashDetail',
      meta: {
        requireAuth: true
      },
      component: cashDetail
    },
    {
      path: '/activityBannerList',
      name: 'activityBannerList',
      meta: {
        requireAuth: true
      },
      component: activityBannerList
    },
    {
      path: '/addActivityBanner',
      name: 'addActivityBanner',
      meta: {
        requireAuth: true
      },
      component: addActivityBanner
    },
    {
      path: '/activityBannerDetail',
      name: 'activityBannerDetail',
      meta: {
        requireAuth: true
      },
      component: activityBannerDetail
    },
    {
      path: '/liveBroadcastList',
      name: 'liveBroadcastList',
      meta: {
        requireAuth: true
      },
      component: liveBroadcastList
    },
    {
      path: '/addLiveBroadcast',
      name: 'addLiveBroadcast',
      meta: {
        requireAuth: true
      },
      component: addLiveBroadcast
    },
    {
      path: '/liveBroadcastDetail',
      name: 'liveBroadcastDetail',
      meta: {
        requireAuth: true
      },
      component: liveBroadcastDetail
    },
    //消息
    {
      path: '/createPopUpMessage',
      name: 'createPopUpMessage',
      meta: {
        requireAuth: true
      },
      component: createPopUpMessage
    },
    {
      path: '/editPopUpMessage/:id',
      name: 'editPopUpMessage',
      meta: {
        requireAuth: true
      },
      component: editPopUpMessage
    },
    {
      path: '/detailPopUpMessage/:id',
      name: 'detailPopUpMessage',
      meta: {
        requireAuth: true
      },
      component: detailPopUpMessage
    },
    {
      path: '/createPushMessage',
      name: 'createPushMessage',
      meta: {
        requireAuth: true
      },
      component: createPushMessage
    },
    {
      path: '/editPushMessage/:id',
      name: 'editPushMessage',
      meta: {
        requireAuth: true
      },
      component: editPushMessage
    },
    {
      path: '/detailPushMessage/:id',
      name: 'detailPushMessage',
      meta: {
        requireAuth: true
      },
      component: detailPushMessage
    },
    {
      path: '/createReminderMessage',
      name: 'createReminderMessage',
      meta: {
        requireAuth: true
      },
      component: createReminderMessage
    },
    {
      path: '/editReminderMessage/:id',
      name: 'editReminderMessage',
      meta: {
        requireAuth: true
      },
      component: editReminderMessage
    },
    {
      path: '/detailReminderMessage/:id',
      name: 'detailReminderMessage',
      meta: {
        requireAuth: true
      },
      component: detailReminderMessage
    },
    {
      path: '/createSMS',
      name: 'createSMS',
      meta: {
        requireAuth: true
      },
      component: createSMS
    },
    {
      path: '/editSMS/:id',
      name: 'editSMS',
      meta: {
        requireAuth: true
      },
      component: editSMS
    },
    {
      path: '/detailSMS/:id',
      name: 'detailSMS',
      meta: {
        requireAuth: true
      },
      component: detailSMS
    },
    {
      path: '/messageClassify',
      name: 'messageClassify',
      meta: {
        requireAuth: true
      },
      component: messageClassify
    },
    {
      path: '/popUpMessage',
      name: 'popUpMessage',
      meta: {
        requireAuth: true
      },
      component: popUpMessage
    },
    {
      path: '/pushMessage',
      name: 'pushMessage',
      meta: {
        requireAuth: true
      },
      component: pushMessage
    },
    {
      path: '/reminderMessage',
      name: 'reminderMessage',
      meta: {
        requireAuth: true
      },
      component: reminderMessage
    },
    {
      path: '/smsMessage',
      name: 'smsMessage',
      meta: {
        requireAuth: true
      },
      component: smsMessage
    },
    {
      path: '/messageConfigurationList',
      name: 'messageConfigurationList',
      meta: {
        requireAuth: true
      },
      component: messageConfigurationList
    },
    {
      path: '/messageRecord',
      name: 'messageRecord',
      meta: {
        requireAuth: true
      },
      component: messageRecord
    },
    {
      path: '/noticeMessage',
      name: 'noticeMessage',
      meta: {
        requireAuth: true
      },
      component: noticeMessage
    },
    {
      path: '/marketingMessage',
      name: 'marketingMessage',
      meta: {
        requireAuth: true
      },
      component: marketingMessage
    },
    {
      path: '/triggerMessage',
      name: 'triggerMessage',
      meta: {
        requireAuth: true
      },
      component: triggerMessage
    },
    {
      path: '/editTriggerMessage/:id',
      name: 'editTriggerMessage',
      meta: {
        requireAuth: true
      },
      component: editTriggerMessage
    },
    {
      path: '/editNoticeMessage/:id',
      name: 'editNoticeMessage',
      meta: {
        requireAuth: true
      },
      component: editNoticeMessage
    },
    {
      path: '/editMarketingMessage/:id',
      name: 'editMarketingMessage',
      meta: {
        requireAuth: true
      },
      component: editMarketingMessage
    },
    {
      path: '/taskDetail/:id/:type',
      name: 'taskDetail',
      meta: {
        requireAuth: true
      },
      component: taskDetail
    },
    {
      path: '/techMessage',
      name: 'techMessage',
      meta: {
        requireAuth: true
      },
      component: techMessage
    },
    {
      path: '/editTechMessage/:id',
      name: 'editTechMessage',
      meta: {
        requireAuth: true
      },
      component: editTechMessage
    },
]

});
export default vueRouter



