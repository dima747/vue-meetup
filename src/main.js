import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import DateFilter from './filters/date'
import * as Firebase from 'firebase'

import colors from 'vuetify/es5/util/colors'

Vue.filter('date', DateFilter)

Vue.use(Vuetify, {
  theme: {
    primary: colors.purple.base,
    secondary: colors.grey.darken1,
    accent: colors.shades.black,
    error: colors.red.accent3
  }
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    Firebase.initializeApp({
      apiKey: 'AIzaSyClIhdGqiobCkMeb79yTjzjrwtldlYSPuo',
      authDomain: 'meetup-68632.firebaseapp.com',
      databaseURL: 'https://meetup-68632.firebaseio.com',
      projectId: 'meetup-68632',
      storageBucket: 'meetup-68632.appspot.com'
    })
  }
})
