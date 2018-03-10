import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import exemptions from './modules/exemptions'
import removalHistory from './modules/removal-history'
import activityReport from './modules/activity-report'
import cache from './modules/cache'
import members from './modules/members'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clanId: process.env.CLAN_ID,
    clanMembers: undefined,
    session: undefined,
    activeMemberCharacterActivity: undefined,
    activityDetails: {},
    invitedMembers: undefined,
    showSessionExpirationDialog: false
  },
  getters: {
    clanMembers: state => state.clanMembers,
    session: state => state.session,
    activeMemberCharacterActivity: state => state.activeMemberCharacterActivity,
    activityDetails: state => state.activityDetails,
    invitedMembers: state => state.invitedMembers,
    showSessionExpirationDialog: state => state.showSessionExpirationDialog
  },
  actions,
  mutations,
  modules: {
    exemptions,
    removalHistory,
    activityReport,
    cache,
    members
  }
})
