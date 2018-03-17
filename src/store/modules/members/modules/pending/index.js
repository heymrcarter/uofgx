import * as actions from './actions'
import * as mutations from './mutations'

export default {
  namespaced: true,
  state: {
    members: undefined,
    isLoadingPendingMembers: false,
    didLoadPendingMembers: false,
    pendingMembersLoadError: false
  },
  getters: {
    pendingMembers: state => state.members,
    isLoadingPendingMembers: state => state.isLoadingPendingMembers,
    didLoadPendingMembers: state => state.didLoadPendingMembers,
    pendingMembersLoadError: state => state.pendingMembersLoadError
  },
  actions,
  mutations
}
