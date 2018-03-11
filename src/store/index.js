import Vue from 'vue'
import Vuex from 'vuex'
import exemptions from './modules/exemptions'
import removalHistory from './modules/removal-history'
import activityReport from './modules/activity-report'
import cache from './modules/cache'
import members from './modules/members'
import activity from './modules/activity'
import session from './modules/session'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    clanId: () => process.env.CLAN_ID
  },
  modules: {
    exemptions,
    removalHistory,
    activityReport,
    cache,
    members,
    activity,
    session
  }
})
