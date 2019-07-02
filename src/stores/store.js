import Vue from 'vue'
import Vuex from 'vuex'
import state from '@/stores/state'
import getters from '@/stores/getters'
import mutations from '@/stores/mutations'
import actions from '@/stores/actions'
//声明使用vuex
Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})
