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

Vue.use(Vuetify)
Vue.use(responsive)

if (process.env.NODE_ENV === 'production') {
  Vue.use(VueAnalytics, {
    id: process.env.ANALYTICS_ID,
    router,
    ignoreRoutes: ['OAuth']
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
