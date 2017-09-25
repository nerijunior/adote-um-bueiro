// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App'
import * as VueGoogleMaps from 'vue2-google-maps'
import router from './router'

import axios from 'axios'
import sweetalert from 'sweetalert'

const client = axios.create({
  baseURL: 'http://localhost:3000/api/',
  responseType: 'json'
})

window.axios = client
window.swal = sweetalert

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAag4aIt0PMGqYjJSkY00PSfPS2opfMt54'
  }
})

Vue.use(Vuelidate)

import store from '@/store/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
