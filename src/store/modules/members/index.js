import active from './modules/active'
import pending from './modules/pending'
import invited from './modules/invited'
import * as actions from './actions'
import * as mutations from './mutations'

export default {
  namespaced: true,
  state: {
    list: undefined,
    isLoadingMembers: false,
    didLoadMembers: false,
    loadMembersError: false,
    expansions: {},
    bannedMembers: undefined,
    isLoadingBannedMembers: false,
    didLoadBannedMembers: false,
    bannedMembersLoadError: false
  },
  getters: {
    clanMembers: state => state.list,
    isLoadingMembers: state => state.isLoadingMembers,
    didLoadMembers: state => state.didLoadMembers,
    loadMembersError: state => state.loadMembersError
  },
  actions,
  mutations,
  modules: {
    active,
    pending,
    invited
  }
}
