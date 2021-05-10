import { fetchUserInfo } from '@/untils/api.js';
export default {
  namespaced: true,
  state: {
    userInfo: {}
  },
  getters: {

  },
  mutations: {
    updateUserInfo(state, payload){
      state.userInfo = payload;
    }
  },
  actions: {
    getUserInfo(store, payload){
      fetchUserInfo(payload).then(res => {
        store.commit('updateUserInfo', res)
      })
    }
  }
}