import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    user: {},
    lat: -25.4513147,
    lng: -49.1853675
  },
  mutations: {
    LOADING (state, value) {
      state.loading = value
    },
    SET_LOCATION (state, data) {
      state.lat = data.lat
      state.lng = data.lng
    },
    SET_USER (state, user) {
      state.user = user
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
})
