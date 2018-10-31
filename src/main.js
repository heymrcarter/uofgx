// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import store from './store'
import Chartkick from 'chartkick'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js' // eslint-disable-line
import VueAnalytics from 'vue-analytics'
import '../node_modules/vuetify/dist/vuetify.min.css'
import './scss/vuetify-overrides.scss'
import responsive from 'vue-responsive'

Vue.use(VueChartkick, { Chartkick })

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: '#2b4f9c',
    secondary: '#4772cc',
    accent: '#e9edf5'
  }
})
Vue.use(responsive)

if (process.env.NODE_ENV === 'production') {
  Vue.use(VueAnalytics, {
    id: process.env.ANALYTICS_ID,
    router,
    ignoreRoutes: ['OAuth']
  })

  // temp fix for localstorage bug
  window.localStorage.removeItem(`dcm-${process.env.NODE_ENV}`)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
