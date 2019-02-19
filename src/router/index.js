import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/home'
import financeProductList from '@/financeComponents/financeProductList'
import addFinanceProduct from '@/financeComponents/addFinanceProduct'
import editFinanceProduct from '@/financeComponents/editFinanceProduct'
import merchantProductList from '@/merchantComponents/merchantProductList'
import addMerchant from '@/merchantComponents/addMerchant'
import editMerchant from '@/merchantComponents/editMerchant'
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
import tianji from '@/userManagementComponents/tianji'
import zhifu from '@/userManagementComponents/zhifu'
import yonghu from '@/userManagementComponents/yonghu'
import dingdan from '@/userManagementComponents/dingdan'
import fangkuan from '@/userManagementComponents/fangkuan'
import huankuan from '@/userManagementComponents/huankuan'
import modifyUserInformation from '@/userManagementComponents/modifyUserInformation'
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
//逾期订单、委外订单、催收标签、通话类型
import afterLoanManagement from '@/postLoanManagementComponents/afterLoanManagement'
import afterLoanNoRepay from '@/postLoanManagementComponents/afterLoanNoRepay'
import afterLoanRepayed from '@/postLoanManagementComponents/afterLoanRepayed'
import outsourcingOrderList from '@/postLoanManagementComponents/outsourcingOrderList'
import outsourcingOrderRepayedList from '@/postLoanManagementComponents/outsourcingOrderRepayedList'
import collectionTag from '@/postLoanManagementComponents/collectionTag'
import callTypeTag from '@/postLoanManagementComponents/callTypeTag'
//催收人员、催收群组
import collectionPersonManagement from '@/postLoanManagementComponents/collectionPersonManagement'
import collectionPerson from '@/postLoanManagementComponents/collectionPerson'
import collectionGroupManagement from '@/postLoanManagementComponents/collectionGroupManagement'
import collectionGroup from '@/postLoanManagementComponents/collectionGroup'
import editCollectionGroup from '@/postLoanManagementComponents/editCollectionGroup'


import collectionOrder from '@/postLoanManagementComponents/collectionOrder'
import collectionOrderList from '@/postLoanManagementComponents/collectionOrderList'
import collectionTaskList from '@/postLoanManagementComponents/collectionTaskList'
import collectionTaskFinishList from '@/postLoanManagementComponents/collectionTaskFinishList'
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

//订单区域
import approvalCenter from '@/orderManagementComponents/approvalCenter'
import pendingApproval from '@/orderManagementComponents/pendingApproval'
import pendingLoan from '@/orderManagementComponents/pendingLoan'
import loanMade from '@/orderManagementComponents/loanMade'
import orderList from '@/orderManagementComponents/orderList'
import paymentHistory from '@/orderManagementComponents/paymentHistory'
import loanRecord from '@/orderManagementComponents/loanRecord'
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
// Vue.prototype.baseUrl="192.168.20.216:9999";
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
      path: '/afterLoanRepayed',
      name: 'afterLoanRepayed',
      meta: {
        requireAuth: true
      },
      component: afterLoanRepayed
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
          path:"/tianji",
          component:tianji
        },
        {
          path:"/zhifu",
          component:zhifu
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
        }
      ],
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
      path: '/pendingLoan',
      name: 'pendingLoan',
      meta: {
        requireAuth: true
      },
      component: pendingLoan
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
      path: '/loanRecord',
      name: 'loanRecord',
      meta: {
        requireAuth: true
      },
      component: loanRecord
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



