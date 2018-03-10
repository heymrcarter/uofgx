import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import exemptions from './modules/exemptions'
import removalHistory from './modules/removal-history'
import activityReport from './modules/activity-report'
import cache from './modules/cache'
import members from './modules/members'
import activity from './modules/activity'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clanId: process.env.CLAN_ID,
    clanMembers: undefined,
    session: undefined,
    showSessionExpirationDialog: false
  },
  getters: {
    clanMembers: state => state.clanMembers,
    session: state => state.session,
    showSessionExpirationDialog: state => state.showSessionExpirationDialog
  },
  actions,
  mutations,
  modules: {
    exemptions,
    removalHistory,
    activityReport,
    cache,
    members,
    activity
  }
})
