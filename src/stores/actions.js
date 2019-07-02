import {SET_TOKEN, USER_ID,BANK_CARD,ACTIVE_ID} from './mutation-type'

export default ({
  setToken({commit}, todo) {
    //提交对mutation的请求
    commit(SET_TOKEN, {todo})
  },
  setUserId({commit}, todo) {
    commit(USER_ID, {todo})
  },
  setBankCard({commit},todo){
    commit(BANK_CARD,{todo})
  },
  setActiveId({commit},todo){
    commit(ACTIVE_ID,{todo})
  },
})

