import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clanMembers: undefined,
    inactiveMembers: undefined,
    activeMember: undefined,
    session: undefined
  },
  getters: {
    clanMembers: state => state.clanMembers,
    inactiveMembers: state => state.inactiveMembers,
    activeMember: state => state.activeMember,
    session: state => state.session
  },
  actions,
  mutations
})
