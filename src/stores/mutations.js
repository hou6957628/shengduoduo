import {SET_TOKEN ,USER_ID,BANK_CARD,ACTIVE_ID} from './mutation-type'
export default {
  [SET_TOKEN](state, {todo}) {
    state.userToken = todo;
  },
  [USER_ID](state, {todo}) {
    state.userId = todo;
  },
  [BANK_CARD](state,{todo}){
    state.bankCard=todo;
  },
  [ACTIVE_ID](state,{todo}){
    state.activeId=todo;
  }
}
