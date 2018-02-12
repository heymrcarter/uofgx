import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clanMembers: undefined,
    activityReport: undefined,
    activeMember: undefined,
    session: undefined,
    exemptions: undefined
  },
  getters: {
    clanMembers: state => state.clanMembers,
    activityReport: state => state.activityReport,
    activeMember: state => state.activeMember,
    session: state => state.session,
    exemptions: state => state.exemptions
  },
  actions,
  mutations
})
