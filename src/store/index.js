import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '../utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'token'

export default new Vuex.Store({
  state: {
    userToken: getItem(TOKEN_KEY)
  },
  getters: {
  },
  mutations: {
    setUser (state, data) {
      state.userToken = data
      setItem(TOKEN_KEY, state.userToken)
    }
  },
  actions: {
  },
  modules: {
  }
})
