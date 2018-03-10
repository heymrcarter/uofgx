import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import exemptions from './modules/exemptions'
import removalHistory from './modules/removal-history'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clanMembers: undefined,
    activityReport: undefined,
    activeMember: undefined,
    session: undefined,
    activeMemberCharacterActivity: undefined,
    activityDetails: {},
    charactersCache: {},
    pendingMembers: undefined,
    invitedMembers: undefined,
    showSessionExpirationDialog: false
  },
  getters: {
    clanMembers: state => state.clanMembers,
    activityReport: state => state.activityReport,
    activeMember: state => state.activeMember,
    session: state => state.session,
    activeMemberCharacterActivity: state => state.activeMemberCharacterActivity,
    activityDetails: state => state.activityDetails,
    pendingMembers: state => state.pendingMembers,
    invitedMembers: state => state.invitedMembers,
    showSessionExpirationDialog: state => state.showSessionExpirationDialog
  },
  actions,
  mutations,
  modules: {
    exemptions,
    removalHistory
  }
})
