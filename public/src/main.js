// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App'
import * as VueGoogleMaps from 'vue2-google-maps'
import router from './router'

import sweetalert from 'sweetalert'
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
