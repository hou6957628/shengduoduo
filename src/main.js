// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import home from './home'
import router from './router'
import ElementUI from 'element-ui'

import axios from 'axios'
import $ from 'jquery'
Vue.config.productionTip = false;

Vue.use(ElementUI);
//格式化日期
Vue.prototype.dateFormatCustom = function (date){
  var year=date.getFullYear();
  /* 在日期格式中，月份是从0开始的，因此要加0
   * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
   * */
  var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
  var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
  var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
  var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
  var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
  // 拼接
  // return year+"-"+month+"-"+day+" "+"00:00:00";
  return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
};
//只能输入数字
Vue.prototype.validatorNumber = (rule, value, callback) => {
  if (!value) {
    callback(new Error('输入不能为空'));
  } else {
    if((/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/).test(value) == false){
      callback(new Error("请填写正整数"));
    }else{
      callback();
    }
  }
};
//当前时间
Vue.prototype.currentDate=new Date();
//当天零点
Vue.prototype.currentDateZero=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0);
//当前时间前一个月
Vue.prototype.beforeOneMonth=new Date(new Date().getFullYear(), new Date().getMonth()-1, new Date().getDate(), 0, 0, 0);
//权限全局方法
Vue.prototype.hasPermissionCustom = function (permission){
  // console.log('===');
  let flag = localStorage.authorities.indexOf(permission);
  return flag != -1;
};
// 节流
export function _throttle(fn, interval) {
  var last;
  var timer;
  var interval = interval || 200;
  return function () {
    var th = this;
    var args = arguments;
    var now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        fn.apply(th, args);
      }, interval);
    } else {
      last = now;
      fn.apply(th, args);
    }
  }
}

new Vue({
  el: '#app',
  router,
  components: { home },
  template: '<home/>'
});

