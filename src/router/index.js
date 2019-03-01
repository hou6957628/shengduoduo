import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/home'
//金融产品
import financeProductList from '@/financeComponents/financeProductList'
import addFinanceProduct from '@/financeComponents/addFinanceProduct'
import editFinanceProduct from '@/financeComponents/editFinanceProduct'
//商户
import merchantProductList from '@/merchantComponents/merchantProductList'
import addMerchant from '@/merchantComponents/addMerchant'
import editMerchant from '@/merchantComponents/editMerchant'
//产品
import productProductList from '@/productManagementComponents/productProductList'
import addProduct from '@/productManagementComponents/addProduct'
import editProduct from '@/productManagementComponents/editProduct'
import configProduct from '@/productManagementComponents/configProduct'
//用户管理-用户列表
import userProductList from '@/userManagementComponents/userProductList'
import userDetail from '@/userManagementComponents/userDetail'
import jiben from '@/userManagementComponents/jiben'
import fenxian from '@/userManagementComponents/fenxian'
import yunying from '@/userManagementComponents/yunying'
import yonghu from '@/userManagementComponents/yonghu'
import dingdan from '@/userManagementComponents/dingdan'
import fangkuan from '@/userManagementComponents/fangkuan'
import huankuan from '@/userManagementComponents/huankuan'
import modifyUserInformation from '@/userManagementComponents/modifyUserInformation'
import editCollectRecord from '@/userManagementComponents/editCollectRecord'
//用户管理-黑名单列表
import blackList from '@/userManagementComponents/blackList'
//用户管理-银行卡管理列表
import bankCardManagement from '@/userManagementComponents/bankCardManagement'
import bankCardDetail from '@/userManagementComponents/bankCardDetail'
//风控字段
import fieldList from '@/riskManagementComponents/riskField/fieldList'
//风控用户标签
import tagList from '@/riskManagementComponents/riskCustomerTag/tagList'
import addTag from '@/riskManagementComponents/riskCustomerTag/addTag'
import editTag from '@/riskManagementComponents/riskCustomerTag/editTag'
//风控用户标签分类
import tagClassifyList from '@/riskManagementComponents/riskCustomerTag/tagClassifyList'
import addTagClassify from '@/riskManagementComponents/riskCustomerTag/addTagClassify'
import editTagClassify from '@/riskManagementComponents/riskCustomerTag/editTagClassify'
//风控规则
import ruleList from '@/riskManagementComponents/riskRule/ruleList'
import addRule from '@/riskManagementComponents/riskRule/addRule'
import editRule from '@/riskManagementComponents/riskRule/editRule'
//风控规则分类
import ruleClassifyList from '@/riskManagementComponents/riskRule/ruleClassifyList'
import addRuleClassify from '@/riskManagementComponents/riskRule/addRuleClassify'
import editRuleClassify from '@/riskManagementComponents/riskRule/editRuleClassify'
//风控规则集
import collectionList from '@/riskManagementComponents/riskRuleCollection/collectionList'
import addCollection from '@/riskManagementComponents/riskRuleCollection/addCollection'
import editCollection from '@/riskManagementComponents/riskRuleCollection/editCollection'
//风控规则集分类
import collectionClassifyList from '@/riskManagementComponents/riskRuleCollection/collectionClassifyList'
import addCollectionClassify from '@/riskManagementComponents/riskRuleCollection/addCollectionClassify'
import editCollectionClassify from '@/riskManagementComponents/riskRuleCollection/editCollectionClassify'
//风控流程
import flowList from '@/riskManagementComponents/riskFlow/flowList'
import addFlow from '@/riskManagementComponents/riskFlow/addFlow'
import configFlow from '@/riskManagementComponents/riskFlow/configFlow'
import editFlow from '@/riskManagementComponents/riskFlow/editFlow'
import flowHeadList from '@/riskManagementComponents/riskFlow/flowHeadList'
import addHeadFlow from '@/riskManagementComponents/riskFlow/addHeadFlow'
import editHeadFlow from '@/riskManagementComponents/riskFlow/editHeadFlow'
import configHeadFlow from '@/riskManagementComponents/riskFlow/configHeadFlow'
//风险命中列表
import flowLogList from '@/riskManagementComponents/flowLog/flowLogList'
//逾期订单
import afterLoanManagement from '@/postLoanManagementComponents/afterLoanManagement'
//逾期未还
import afterLoanNoRepay from '@/postLoanManagementComponents/afterLoanNoRepay'
import orderDetailAfterLoanNoRepay from '@/postLoanManagementComponents/orderDetailAfterLoanNoRepay'
import jibenOrder6 from '@/orderManagementComponents/jibenOrder'
import fenxianOrder6 from '@/orderManagementComponents/fenxianOrder'
import yunyingOrder6 from '@/orderManagementComponents/yunyingOrder'
import yonghuOrder6 from '@/orderManagementComponents/yonghuOrder'
import dingdanOrder6 from '@/orderManagementComponents/dingdanOrder'
import fangkuanOrder6 from '@/orderManagementComponents/fangkuanOrder'
import huankuanOrder6 from '@/orderManagementComponents/huankuanOrder'
//逾期已还
import afterLoanRepayed from '@/postLoanManagementComponents/afterLoanRepayed'
import orderDetailAfterLoanRepayed from '@/postLoanManagementComponents/orderDetailAfterLoanRepayed'
import jibenOrder7 from '@/orderManagementComponents/jibenOrder'
import fenxianOrder7 from '@/orderManagementComponents/fenxianOrder'
import yunyingOrder7 from '@/orderManagementComponents/yunyingOrder'
import yonghuOrder7 from '@/orderManagementComponents/yonghuOrder'
import dingdanOrder7 from '@/orderManagementComponents/dingdanOrder'
import fangkuanOrder7 from '@/orderManagementComponents/fangkuanOrder'
import huankuanOrder7 from '@/orderManagementComponents/huankuanOrder'
//委外订单
import outsourcingOrderList from '@/postLoanManagementComponents/outsourcingOrderList'
//委外已还
import outsourcingOrderRepayedList from '@/postLoanManagementComponents/outsourcingOrderRepayedList'
//催收标签、通话类型
import collectionTag from '@/postLoanManagementComponents/collectionTag'
import callTypeTag from '@/postLoanManagementComponents/callTypeTag'
//催收人员、催收群组
import collectionPersonManagement from '@/postLoanManagementComponents/collectionPersonManagement'
import collectionPerson from '@/postLoanManagementComponents/collectionPerson'
import collectionGroupManagement from '@/postLoanManagementComponents/collectionGroupManagement'
import collectionGroup from '@/postLoanManagementComponents/collectionGroup'
import editCollectionGroup from '@/postLoanManagementComponents/editCollectionGroup'
//分单、催回
import collectionOrder from '@/postLoanManagementComponents/collectionOrder'
import collectionOrderList from '@/postLoanManagementComponents/collectionOrderList'
import collectionTaskList from '@/postLoanManagementComponents/collectionTaskList'
import collectionTaskFinishList from '@/postLoanManagementComponents/collectionTaskFinishList'
import addressList from '@/postLoanManagementComponents/addressList'
import addressListEmergency from '@/postLoanManagementComponents/addressListEmergency'
//角色渠道
import addRole from '@/privilegeManagementComponents/addRole'
import roleList from '@/privilegeManagementComponents/roleList'
import accountManagement from '@/privilegeManagementComponents/accountManagement'
import addAccount from '@/privilegeManagementComponents/addAccount'
import channelconnectionManagement from '@/channelManagementComponents/channelconnectionManagement'
import addChannel from '@/channelManagementComponents/addChannel'
import childrenChannelDetail from '@/channelManagementComponents/childrenChannelDetail'
import channelStatistics from '@/channelManagementComponents/channelStatistics'

import editAccount from '@/privilegeManagementComponents/editAccount'
import editRole from '@/privilegeManagementComponents/editRole'
import editCollectionPerson from '@/postLoanManagementComponents/editCollectionPerson'

import approvalCenter from '@/orderManagementComponents/approvalCenter'
//订单区域-待审批
import pendingApproval from '@/orderManagementComponents/pendingApproval'
import orderDetail from '@/orderManagementComponents/orderDetail'
import jibenOrder from '@/orderManagementComponents/jibenOrder'
import fenxianOrder from '@/orderManagementComponents/fenxianOrder'
import yunyingOrder from '@/orderManagementComponents/yunyingOrder'
import yonghuOrder from '@/orderManagementComponents/yonghuOrder'
import dingdanOrder from '@/orderManagementComponents/dingdanOrder'
import fangkuanOrder from '@/orderManagementComponents/fangkuanOrder'
import huankuanOrder from '@/orderManagementComponents/huankuanOrder'
//订单区域-待放款
import pendingLoan from '@/orderManagementComponents/pendingLoan'
import orderDetailPendingLoan from '@/orderManagementComponents/orderDetailPendingLoan'
import jibenOrder1 from '@/orderManagementComponents/jibenOrder'
import fenxianOrder1 from '@/orderManagementComponents/fenxianOrder'
import yunyingOrder1 from '@/orderManagementComponents/yunyingOrder'
import yonghuOrder1 from '@/orderManagementComponents/yonghuOrder'
import dingdanOrder1 from '@/orderManagementComponents/dingdanOrder'
import fangkuanOrder1 from '@/orderManagementComponents/fangkuanOrder'
import huankuanOrder1 from '@/orderManagementComponents/huankuanOrder'
//订单区域-已放款
import loanMade from '@/orderManagementComponents/loanMade'
import orderDetailLoanMade from '@/orderManagementComponents/orderDetailLoanMade'
import jibenOrder2 from '@/orderManagementComponents/jibenOrder'
import fenxianOrder2 from '@/orderManagementComponents/fenxianOrder'
import yunyingOrder2 from '@/orderManagementComponents/yunyingOrder'
import yonghuOrder2 from '@/orderManagementComponents/yonghuOrder'
import dingdanOrder2 from '@/orderManagementComponents/dingdanOrder'
import fangkuanOrder2 from '@/orderManagementComponents/fangkuanOrder'
import huankuanOrder2 from '@/orderManagementComponents/huankuanOrder'
//订单区域-订单管理
import orderList from '@/orderManagementComponents/orderList'
//订单区域-还款记录
import paymentHistory from '@/orderManagementComponents/paymentHistory'
import orderDetailPaymentHistory from '@/orderManagementComponents/orderDetailPaymentHistory'
import jibenOrder4 from '@/orderManagementComponents/jibenOrder'
import fenxianOrder4 from '@/orderManagementComponents/fenxianOrder'
import yunyingOrder4 from '@/orderManagementComponents/yunyingOrder'
import yonghuOrder4 from '@/orderManagementComponents/yonghuOrder'
import dingdanOrder4 from '@/orderManagementComponents/dingdanOrder'
import fangkuanOrder4 from '@/orderManagementComponents/fangkuanOrder'
import huankuanOrder4 from '@/orderManagementComponents/huankuanOrder'
//订单区域-放款记录
import loanRecord from '@/orderManagementComponents/loanRecord'
import orderDetailLoanRecord from '@/orderManagementComponents/orderDetailLoanRecord'
import jibenOrder5 from '@/orderManagementComponents/jibenOrder'
import fenxianOrder5 from '@/orderManagementComponents/fenxianOrder'
import yunyingOrder5 from '@/orderManagementComponents/yunyingOrder'
import yonghuOrder5 from '@/orderManagementComponents/yonghuOrder'
import dingdanOrder5 from '@/orderManagementComponents/dingdanOrder'
import fangkuanOrder5 from '@/orderManagementComponents/fangkuanOrder'
import huankuanOrder5 from '@/orderManagementComponents/huankuanOrder'
//额度
import amountFieldList from '@/amount/amountField/amountFieldList'
import amountTagList from '@/amount/amountTag/amountTagList'
import addAmountTag from '@/amount/amountTag/addAmountTag'
import editAmountTag from '@/amount/amountTag/editAmountTag'
import amountFlowList from '@/amount/amountFlow/amountFlowList'
import addAmountFlow from '@/amount/amountFlow/addAmountFlow'
import editAmountFlow from '@/amount/amountFlow/editAmountFlow'
import configAmountFlow from '@/amount/amountFlow/configAmountFlow'
import amountFlowLogList from '@/amount/amountFlowLog/amountFlowLogList'
//展期
import orderFieldList from '@/orderExtension/orderFieldList'
import orderFlowList from '@/orderExtension/orderFlowList'
import addOrderFlow from '@/orderExtension/addOrderFlow'
import editOrderFlow from '@/orderExtension/editOrderFlow'
import configOrderFlow from '@/orderExtension/configOrderFlow'
import orderFlowLogList from '@/orderExtension/orderFlowLogList'

import axios from 'axios'

//消息
import createClassify from '@/messageConfigurationComponents/createClassify'
import createPopUpMessage from '@/messageConfigurationComponents/createPopUpMessage'
import createPushMessage from '@/messageConfigurationComponents/createPushMessage'
import createReminderMessage from '@/messageConfigurationComponents/createReminderMessage'
import createSMS from '@/messageConfigurationComponents/createSMS'
import messageClassify from '@/messageConfigurationComponents/messageClassify'
import popUpMessage from '@/messageConfigurationComponents/popUpMessage'
import pushMessage from '@/messageConfigurationComponents/pushMessage'
import reminderMessage from '@/messageConfigurationComponents/reminderMessage'
import smsMessage from '@/messageConfigurationComponents/smsMessage'
import messageConfigurationList from '@/messageManagementComponents/messageConfigurationList'
import messageRecord from '@/messageManagementComponents/messageRecord'
import noticeMessage from '@/messageManagementComponents/noticeMessage'
import changeSMS from '@/messageManagementComponents/changeSMS'
import changePush from '@/messageManagementComponents/changePush'
import changeMessage from '@/messageManagementComponents/changeMessage'
import changePopUp from '@/messageManagementComponents/changePopUp'
import marketingMessage from '@/messageManagementComponents/marketingMessage'
import triggerMessage from '@/messageManagementComponents/triggerMessage'
import messageDetail from '@/messageManagementComponents/messageDetail'
import popUpDetail from '@/messageManagementComponents/popUpDetail'
import pushDetail from '@/messageManagementComponents/pushDetail'
import smsDetail from '@/messageManagementComponents/smsDetail'

Vue.use(Router);
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.token=='') {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      Router.replace({
        path: '/login'
      })
    }
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

Vue.prototype.baseUrl="39.105.217.251:31999";
Vue.prototype.baseIp="http://39.105.217.251";
//风控
// Vue.prototype.baseUrl="localhost:9998";
//额度
// Vue.prototype.baseUrl="localhost:9991";
//订单
// Vue.prototype.baseUrl="localhost:9997";
//产品operate
// Vue.prototype.baseUrl="localhost:8888";
//用户中心
// Vue.prototype.baseUrl="localhost:9995";
Vue.prototype.uurl="window.location.origin";

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
      path: '/financeProductList/:name',
      name: 'financeProductList',
      meta: {
        requireAuth: true
      },
      component: financeProductList
    },
    {
      path: '/financeProductList',
      name: 'financeProductList1',
      meta: {
        requireAuth: true
      },
      component: financeProductList
    },
    {
      path: '/addFinanceProduct',
      name: 'addFinanceProduct',
      meta: {
        requireAuth: true
      },
      component: addFinanceProduct
    },
    {
      path: '/editFinanceProduct/:id',
      name: 'editFinanceProduct',
      meta: {
        requireAuth: true
      },
      component: editFinanceProduct
    },
    {
      path: '/merchantProductList',
      name: 'merchantProductList',
      meta: {
        requireAuth: true
      },
      component: merchantProductList
    },
    {
      path: '/addMerchant',
      name: 'addMerchant',
      meta: {
        requireAuth: true
      },
      component: addMerchant
    },
    {
      path: '/editMerchant/:id',
      name: 'editMerchant',
      meta: {
        requireAuth: true
      },
      component: editMerchant
    },
    {
      path: '/productProductList',
      name: 'productProductList',
      meta: {
        requireAuth: true
      },
      component: productProductList
    },
    {
      path: '/addProduct',
      name: 'addProduct',
      meta: {
        requireAuth: true
      },
      component: addProduct
    },
    {
      path: '/editProduct/:id',
      name: 'editProduct',
      meta: {
        requireAuth: true
      },
      component: editProduct
    },
    {
      path: '/configProduct/:id/:merchantId',
      name: 'configProduct',
      meta: {
        requireAuth: true
      },
      component: configProduct
    },
    {
      path: '/userProductList',
      name: 'userProductList',
      meta: {
        requireAuth: true
      },
      component: userProductList
    },
    //风控字段
    {
      path: '/fieldList',
      name: 'fieldList',
      meta: {
        requireAuth: true
      },
      component: fieldList
    },
    //风控用户标签
    {
      path: '/tagList',
      name: 'tagList',
      meta: {
        requireAuth: true
      },
      component: tagList
    },
    {
      path: '/addTag',
      name: 'addTag',
      meta: {
        requireAuth: true
      },
      component: addTag
    },
    {
      path: '/editTag/:id',
      name: 'editTag',
      meta: {
        requireAuth: true
      },
      component: editTag
    },
    //风控用户标签分类
    {
      path: '/tagClassifyList',
      name: 'tagClassifyList',
      meta: {
        requireAuth: true
      },
      component: tagClassifyList
    },
    {
      path: '/addTagClassify',
      name: 'addTagClassify',
      meta: {
        requireAuth: true
      },
      component: addTagClassify
    },
    {
      path: '/editTagClassify/:id',
      name: 'editTagClassify',
      meta: {
        requireAuth: true
      },
      component: editTagClassify
    },
    //规则
    {
      path: '/ruleList',
      name: 'ruleList',
      meta: {
        requireAuth: true
      },
      component: ruleList
    },
    {
      path: '/addRule',
      name: 'addRule',
      meta: {
        requireAuth: true
      },
      component: addRule
    },
    {
      path: '/editRule/:id',
      name: 'editRule',
      meta: {
        requireAuth: true
      },
      component: editRule
    },
    //规则分类
    {
      path: '/ruleClassifyList',
      name: 'ruleClassifyList',
      meta: {
        requireAuth: true
      },
      component: ruleClassifyList
    },
    {
      path: '/addRuleClassify',
      name: 'addRuleClassify',
      meta: {
        requireAuth: true
      },
      component: addRuleClassify
    },
    {
      path: '/editRuleClassify/:id',
      name: 'editRuleClassify',
      meta: {
        requireAuth: true
      },
      component: editRuleClassify
    },
    //规则集
    {
      path: '/collectionList',
      name: 'collectionList',
      meta: {
        requireAuth: true
      },
      component: collectionList
    },
    {
      path: '/addCollection',
      name: 'addCollection',
      meta: {
        requireAuth: true
      },
      component: addCollection
    },
    {
      path: '/editCollection/:id',
      name: 'editCollection',
      meta: {
        requireAuth: true
      },
      component: editCollection
    },
    //规则集分类
    {
      path: '/collectionClassifyList',
      name: 'collectionClassifyList',
      meta: {
        requireAuth: true
      },
      component: collectionClassifyList
    },
    {
      path: '/addCollectionClassify',
      name: 'addCollectionClassify',
      meta: {
        requireAuth: true
      },
      component: addCollectionClassify
    },
    {
      path: '/editCollectionClassify/:id',
      name: 'editCollectionClassify',
      meta: {
        requireAuth: true
      },
      component: editCollectionClassify
    },
    //风控流程
    {
      path: '/flowList',
      name: 'flowList',
      meta: {
        requireAuth: true
      },
      component: flowList
    },
    {
      path: '/addFlow',
      name: 'addFlow',
      meta: {
        requireAuth: true
      },
      component: addFlow
    },
    {
      path: '/configFlow/:id',
      name: 'configFlow',
      meta: {
        requireAuth: true
      },
      component: configFlow
    },
    {
      path: '/editFlow/:id',
      name: 'editFlow',
      meta: {
        requireAuth: true
      },
      component: editFlow
    },
    {
      path: '/flowHeadList',
      name: 'flowHeadList',
      meta: {
        requireAuth: true
      },
      component: flowHeadList
    },
    {
      path: '/addHeadFlow',
      name: 'addHeadFlow',
      meta: {
        requireAuth: true
      },
      component: addHeadFlow
    },
    {
      path: '/editHeadFlow/:id',
      name: 'editHeadFlow',
      meta: {
        requireAuth: true
      },
      component: editHeadFlow
    },
    {
      path: '/configHeadFlow/:id',
      name: 'configHeadFlow',
      meta: {
        requireAuth: true
      },
      component: configHeadFlow
    },
    {
      path: '/flowLogList',
      name: 'flowLogList',
      meta: {
        requireAuth: true
      },
      component: flowLogList
    },
    {
      path: '/afterLoanManagement',
      name: 'afterLoanManagement',
      meta: {
        requireAuth: true
      },
      component: afterLoanManagement
    },
    {
      path: '/afterLoanNoRepay',
      name: 'afterLoanNoRepay',
      meta: {
        requireAuth: true
      },
      component: afterLoanNoRepay
    },
    {
      path: '/orderDetailAfterLoanNoRepay/:id/:orderId',
      name: 'orderDetailAfterLoanNoRepay',
      meta: {
        requireAuth: true
      },
      children:[
        {
          path:"/jibenOrder6/:id/:orderId",
          component:jibenOrder6
        },
        {
          path:"/fenxianOrder6/:id",
          component:fenxianOrder6
        },
        {
          path:"/yunyingOrder6/:id",
          component:yunyingOrder6
        },
        {
          path:"/yonghuOrder6/:id",
          component:yonghuOrder6
        },
        {
          path:"/dingdanOrder6/:id",
          component:dingdanOrder6
        },
        {
          path:"/fangkuanOrder6/:id",
          component:fangkuanOrder6
        },
        {
          path:"/huankuanOrder6/:id",
          component:huankuanOrder6
        }
      ],
      //重定向
      redirect: '/jibenOrder6/:id/:orderId',
      component: orderDetailAfterLoanNoRepay
    },
    {
      path: '/afterLoanRepayed',
      name: 'afterLoanRepayed',
      meta: {
        requireAuth: true
      },
      component: afterLoanRepayed
    },
    {
      path: '/orderDetailAfterLoanRepayed/:id/:orderId',
      name: 'orderDetailAfterLoanRepayed',
      meta: {
        requireAuth: true
      },
      children:[
        {
          path:"/jibenOrder7/:id/:orderId",
          component:jibenOrder7
        },
        {
          path:"/fenxianOrder7/:id",
          component:fenxianOrder7
        },
        {
          path:"/yunyingOrder7/:id",
          component:yunyingOrder7
        },
        {
          path:"/yonghuOrder7/:id",
          component:yonghuOrder7
        },
        {
          path:"/dingdanOrder7/:id",
          component:dingdanOrder7
        },
        {
          path:"/fangkuanOrder7/:id",
          component:fangkuanOrder7
        },
        {
          path:"/huankuanOrder7/:id",
          component:huankuanOrder7
        }
      ],
      //重定向
      redirect: '/jibenOrder7/:id/:orderId',
      component: orderDetailAfterLoanRepayed
    },
    {
      path: '/outsourcingOrderList',
      name: 'outsourcingOrderList',
      meta: {
        requireAuth: true
      },
      component: outsourcingOrderList
    },
    {
      path: '/outsourcingOrderRepayedList',
      name: 'outsourcingOrderRepayedList',
      meta: {
        requireAuth: true
      },
      component: outsourcingOrderRepayedList
    },
    {
      path: '/collectionTag',
      name: 'collectionTag',
      meta: {
        requireAuth: true
      },
      component: collectionTag
    },
    {
      path: '/callTypeTag',
      name: 'callTypeTag',
      meta: {
        requireAuth: true
      },
      component: callTypeTag
    },
    {
      path: '/collectionPersonManagement',
      name: 'collectionPersonManagement',
      meta: {
        requireAuth: true
      },
      component: collectionPersonManagement
    },
    {
      path: '/collectionPerson',
      name: 'collectionPerson',
      meta: {
        requireAuth: true
      },
      component: collectionPerson
    },
    {
      path: '/collectionGroupManagement',
      name: 'collectionGroupManagement',
      meta: {
        requireAuth: true
      },
      component: collectionGroupManagement
    },
    {
      path: '/collectionGroup',
      name: 'collectionGroup',
      meta: {
        requireAuth: true
      },
      component: collectionGroup
    },
    {
      path: '/editCollectionGroup/:id',
      name: 'editCollectionGroup',
      meta: {
        requireAuth: true
      },
      component: editCollectionGroup
    },
    {
      path: '/collectionOrder',
      name: 'collectionOrder',
      meta: {
        requireAuth: true
      },
      component: collectionOrder
    },
    {
      path: '/collectionOrderList',
      name: 'collectionOrderList',
      meta: {
        requireAuth: true
      },
      component: collectionOrderList
    },
    {
      path: '/collectionTaskList',
      name: 'collectionTaskList',
      meta: {
        requireAuth: true
      },
      component: collectionTaskList
    },
    {
      path: '/collectionTaskFinishList',
      name: 'collectionTaskFinishList',
      meta: {
        requireAuth: true
      },
      component: collectionTaskFinishList
    },
    {
      path: '/addressList/:id',
      name: 'addressList',
      meta: {
        requireAuth: true
      },
      component: addressList
    },
    {
      path: '/addressListEmergency/:id',
      name: 'addressListEmergency',
      meta: {
        requireAuth: true
      },
      component: addressListEmergency
    },
    {
      path: '/addRole',
      name: 'addRole',
      meta: {
        requireAuth: true
      },
      component: addRole
    },
    {
      path: '/roleList',
      name: 'roleList',
      meta: {
        requireAuth: true
      },
      component: roleList
    },
    {
      path: '/accountManagement',
      name: 'accountManagement',
      meta: {
        requireAuth: true
      },
      component: accountManagement
    },
    {
      path: '/addAccount',
      name: 'addAccount',
      meta: {
        requireAuth: true
      },
      component: addAccount
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
      path: '/childrenChannelDetail',
      name: 'childrenChannelDetail',
      meta: {
        requireAuth: true
      },
      component: childrenChannelDetail
    },
    {
      path: '/yunying',
      name: 'yunying',
      meta: {
        requireAuth: true
      },
      component: yunying
    },
    {
      path: '/userDetail/:id',
      name: 'userDetail',
      meta: {
        requireAuth: true
      },
      children:[
        {
          path:"/jiben/:id",
          component:jiben
        },
        {
          path:"/fenxian/:id",
          component:fenxian
        },
        {
          path:"/yunying/:id",
          component:yunying
        },
        {
          path:"/yonghu/:id",
          component:yonghu
        },
        {
          path:"/dingdan/:id",
          component:dingdan
        },
        {
          path:"/fangkuan/:id",
          component:fangkuan
        },
        {
          path:"/huankuan/:id",
          component:huankuan
        },
        {
          path:"/editCollectRecord/:id",
          component:editCollectRecord
        }
      ],
      //重定向
      redirect: '/jiben/:id',
      component: userDetail
    },
    {
      path: '/modifyUserInformation/:id',
      name: 'modifyUserInformation',
      meta: {
        requireAuth: true
      },
      component: modifyUserInformation
    },
    // {
    //   path: '/editCollectRecord/:id',
    //   name: 'editCollectRecord',
    //   meta: {
    //     requireAuth: true
    //   },
    //   component: editCollectRecord
    // },
    {
      path: '/blackList',
      name: 'blackList',
      meta: {
        requireAuth: true
      },
      component: blackList
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
      path: '/bankCardDetail/:id',
      name: 'bankCardDetail',
      meta: {
        requireAuth: true
      },
      component: bankCardDetail
    },
    //额度
    {
      path: '/amountFieldList',
      name: 'amountFieldList',
      meta: {
        requireAuth: true
      },
      component: amountFieldList
    },
    {
      path: '/amountTagList',
      name: 'amountTagList',
      meta: {
        requireAuth: true
      },
      component: amountTagList
    },
    {
      path: '/addAmountTag',
      name: 'addAmountTag',
      meta: {
        requireAuth: true
      },
      component: addAmountTag
    },
    {
      path: '/editAmountTag/:id',
      name: 'editAmountTag',
      meta: {
        requireAuth: true
      },
      component: editAmountTag
    },
    {
      path: '/amountFlowList',
      name: 'amountFlowList',
      meta: {
        requireAuth: true
      },
      component: amountFlowList
    },
    {
      path: '/addAmountFlow',
      name: 'addAmountFlow',
      meta: {
        requireAuth: true
      },
      component: addAmountFlow
    },
    {
      path: '/editAmountFlow/:id',
      name: 'editAmountFlow',
      meta: {
        requireAuth: true
      },
      component: editAmountFlow
    },
    {
      path: '/configAmountFlow/:id',
      name: 'configAmountFlow',
      meta: {
        requireAuth: true
      },
      component: configAmountFlow
    },
    {
      path: '/amountFlowLogList',
      name: 'amountFlowLogList',
      meta: {
        requireAuth: true
      },
      component: amountFlowLogList
    },

    {
      path: '/channelStatistics',
      name: 'channelStatistics',
      meta: {
        requireAuth: true
      },
      component: channelStatistics
    },
    {
      path: '/editAccount/:id',
      name: 'editAccount',
      meta: {
        requireAuth: true
      },
      component: editAccount
    },
    {
      path: '/editRole/:id',
      name: 'editRole',
      meta: {
        requireAuth: true
      },
      component: editRole
    },
    {
      path: '/addRole',
      name: 'addRole',
      meta: {
        requireAuth: true
      },
      component: addRole
    },
    {
      path: '/editCollectionPerson/:id',
      name: 'editCollectionPerson',
      meta: {
        requireAuth: true
      },
      component: editCollectionPerson
    },
    //订单区域
    {
      path: '/approvalCenter',
      name: 'approvalCenter',
      meta: {
        requireAuth: true
      },
      component: approvalCenter
    },
    {
      path: '/pendingApproval',
      name: 'pendingApproval',
      meta: {
        requireAuth: true
      },
      component: pendingApproval
    },
    {
      path: '/orderDetail/:id/:orderId',
      name: 'orderDetail',
      meta: {
        requireAuth: true
      },
      children:[
        {
          path:"/jibenOrder/:id/:orderId",
          component:jibenOrder
        },
        {
          path:"/fenxianOrder/:id",
          component:fenxianOrder
        },
        {
          path:"/yunyingOrder/:id",
          component:yunyingOrder
        },
        {
          path:"/yonghuOrder/:id",
          component:yonghuOrder
        },
        {
          path:"/dingdanOrder/:id",
          component:dingdanOrder
        },
        {
          path:"/fangkuanOrder/:id",
          component:fangkuanOrder
        },
        {
          path:"/huankuanOrder/:id",
          component:huankuanOrder
        }
      ],
      //重定向
      redirect: '/jibenOrder/:id/:orderId',
      component: orderDetail
    },
    {
      path: '/pendingLoan',
      name: 'pendingLoan',
      meta: {
        requireAuth: true
      },
      component: pendingLoan
    },
    {
      path: '/orderDetailPendingLoan/:id/:orderId',
      name: 'orderDetailPendingLoan',
      meta: {
        requireAuth: true
      },
      children:[
        {
          path:"/jibenOrder1/:id/:orderId",
          component:jibenOrder1
        },
        {
          path:"/fenxianOrder1/:id",
          component:fenxianOrder1
        },
        {
          path:"/yunyingOrder1/:id",
          component:yunyingOrder1
        },
        {
          path:"/yonghuOrder1/:id",
          component:yonghuOrder1
        },
        {
          path:"/dingdanOrder1/:id",
          component:dingdanOrder1
        },
        {
          path:"/fangkuanOrder1/:id",
          component:fangkuanOrder1
        },
        {
          path:"/huankuanOrder1/:id",
          component:huankuanOrder1
        }
      ],
      //重定向
      redirect: '/jibenOrder1/:id/:orderId',
      component: orderDetailPendingLoan
    },
    {
      path: '/loanMade',
      name: 'loanMade',
      meta: {
        requireAuth: true
      },
      component: loanMade
    },
    {
      path: '/orderDetailLoanMade/:id/:orderId',
      name: 'orderDetailLoanMade',
      meta: {
        requireAuth: true
      },
      children:[
        {
          path:"/jibenOrder2/:id/:orderId",
          component:jibenOrder2
        },
        {
          path:"/fenxianOrder2/:id",
          component:fenxianOrder2
        },
        {
          path:"/yunyingOrder2/:id",
          component:yunyingOrder2
        },
        {
          path:"/yonghuOrder2/:id",
          component:yonghuOrder2
        },
        {
          path:"/dingdanOrder2/:id",
          component:dingdanOrder2
        },
        {
          path:"/fangkuanOrder2/:id",
          component:fangkuanOrder2
        },
        {
          path:"/huankuanOrder2/:id",
          component:huankuanOrder2
        }
      ],
      //重定向
      redirect: '/jibenOrder2/:id/:orderId',
      component: orderDetailLoanMade
    },
    {
      path: '/orderList',
      name: 'orderList',
      meta: {
        requireAuth: true
      },
      component: orderList
    },
    {
      path: '/paymentHistory',
      name: 'paymentHistory',
      meta: {
        requireAuth: true
      },
      component: paymentHistory
    },
    {
      path: '/orderDetailPaymentHistory/:id/:orderId',
      name: 'orderDetailPaymentHistory',
      meta: {
        requireAuth: true
      },
      children:[
        {
          path:"/jibenOrder4/:id/:orderId",
          component:jibenOrder4
        },
        {
          path:"/fenxianOrder4/:id",
          component:fenxianOrder4
        },
        {
          path:"/yunyingOrder4/:id",
          component:yunyingOrder4
        },
        {
          path:"/yonghuOrder4/:id",
          component:yonghuOrder4
        },
        {
          path:"/dingdanOrder4/:id",
          component:dingdanOrder4
        },
        {
          path:"/fangkuanOrder4/:id",
          component:fangkuanOrder4
        },
        {
          path:"/huankuanOrder4/:id",
          component:huankuanOrder4
        }
      ],
      //重定向
      redirect: '/jibenOrder4/:id/:orderId',
      component: orderDetailPaymentHistory
    },
    {
      path: '/loanRecord',
      name: 'loanRecord',
      meta: {
        requireAuth: true
      },
      component: loanRecord
    },
    {
      path: '/orderDetailLoanRecord/:id/:orderId',
      name: 'orderDetailLoanRecord',
      meta: {
        requireAuth: true
      },
      children:[
        {
          path:"/jibenOrder5/:id/:orderId",
          component:jibenOrder5
        },
        {
          path:"/fenxianOrder5/:id",
          component:fenxianOrder5
        },
        {
          path:"/yunyingOrder5/:id",
          component:yunyingOrder5
        },
        {
          path:"/yonghuOrder5/:id",
          component:yonghuOrder5
        },
        {
          path:"/dingdanOrder5/:id",
          component:dingdanOrder5
        },
        {
          path:"/fangkuanOrder5/:id",
          component:fangkuanOrder5
        },
        {
          path:"/huankuanOrder5/:id",
          component:huankuanOrder5
        }
      ],
      //重定向
      redirect: '/jibenOrder5/:id/:orderId',
      component: orderDetailLoanRecord
    },
    //展期
    {
      path: '/orderFieldList',
      name: 'orderFieldList',
      meta: {
        requireAuth: true
      },
      component: orderFieldList
    },
    {
      path: '/orderFlowList',
      name: 'orderFlowList',
      meta: {
        requireAuth: true
      },
      component: orderFlowList
    },
    {
      path: '/addOrderFlow',
      name: 'addOrderFlow',
      meta: {
        requireAuth: true
      },
      component: addOrderFlow
    },
    {
      path: '/editOrderFlow/:id',
      name: 'editOrderFlow',
      meta: {
        requireAuth: true
      },
      component: editOrderFlow
    },
    {
      path: '/configOrderFlow/:id',
      name: 'configOrderFlow',
      meta: {
        requireAuth: true
      },
      component: configOrderFlow
    },
    {
      path: '/orderFlowLogList',
      name: 'orderFlowLogList',
      meta: {
        requireAuth: true
      },
      component: orderFlowLogList
    },

    //消息
    {
      path: '/createClassify',
      name: 'createClassify',
      meta: {
        requireAuth: true
      },
      component: createClassify
    },
    {
      path: '/createPopUpMessage',
      name: 'createPopUpMessage',
      meta: {
        requireAuth: true
      },
      component: createPopUpMessage
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
      path: '/createReminderMessage',
      name: 'createReminderMessage',
      meta: {
        requireAuth: true
      },
      component: createReminderMessage
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
      path: '/changeSMS',
      name: 'changeSMS',
      meta: {
        requireAuth: true
      },
      component: changeSMS
    },
    {
      path: '/changePush',
      name: 'changePush',
      meta: {
        requireAuth: true
      },
      component: changePush
    },
    {
      path: '/changeMessage',
      name: 'changeMessage',
      meta: {
        requireAuth: true
      },
      component: changeMessage
    },
    {
      path: '/changePopUp',
      name: 'changePopUp',
      meta: {
        requireAuth: true
      },
      component: changePopUp
    },
    {
      path: '/messageDetail',
      name: 'messageDetail',
      meta: {
        requireAuth: true
      },
      component: messageDetail
    },
    {
      path: '/popUpDetail',
      name: 'popUpDetail',
      meta: {
        requireAuth: true
      },
      component: popUpDetail
    },
    {
      path: '/pushDetail',
      name: 'pushDetail',
      meta: {
        requireAuth: true
      },
      component: pushDetail
    },
    {
      path: '/smsDetail',
      name: 'smsDetail',
      meta: {
        requireAuth: true
      },
      component: smsDetail
    },
]

});
vueRouter.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (localStorage.getItem("token")) {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login',
        // query: {redirect: vueRouter.currentRoute.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});
export default vueRouter



