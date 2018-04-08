import Vue from 'vue'
import Vuex from 'vuex'
import exemptions from './modules/exemptions'
import removalHistory from './modules/removal-history'
import activityReport from './modules/activity-report'
import cache from './modules/cache'
import members from './modules/members'
import activity from './modules/activity'
import session from './modules/session'
import * as actions from './actions'
import * as mutations from './mutations'
import notes from './modules/notes'
import roadmap from './modules/roadmap'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clanId: undefined,
    clanName: undefined
  },
  getters: {
    clanId: () => process.env.CLAN_ID
  },
  actions,
  mutations,
  modules: {
    exemptions,
    removalHistory,
    activityReport,
    cache,
    members,
    activity,
    session,
    notes,
    roadmap
  }
})
