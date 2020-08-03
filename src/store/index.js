import Vue from 'vue'
import Vuex from 'vuex'

// 全局注册vueX
Vue.use(Vuex)

const state = sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
  loginInfor: {
    IPAddresss: '',
    name: '',
    id: '',
    token: '',
    permissions: '',
    is_superuser: false
  }
}
const action = {
}
const mutations = {
  saveLoginInfor (state, payload) {
    state.loginInfor.IPAddresss = payload.IPAddresss
    state.loginInfor.name = payload.name
    state.loginInfor.id = payload.id
    state.loginInfor.token = payload.token
    state.loginInfor.permissions = payload.permissions
    state.loginInfor.is_superuser = payload.is_superuser
  }
}
const getters = {
  getuserInfor (state) {
    return state.loginInfor
  }
}

export default new Vuex.Store({
  state,
  action,
  mutations,
  getters
})
