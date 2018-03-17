import * as actions from './actions'
import * as mutations from './mutations'

export default {
  namespaced: true,
  state: {
    members: undefined,
    isLoadingInvitedMembers: false,
    didLoadInvitedMembers: false,
    invitedMembersLoadError: false
  },
  getters: {
    invitedMembers: state => state.members,
    isLoadingInvitedMembers: state => state.isLoadingInvitedMembers,
    didLoadInvitedMembers: state => state.didLoadInvitedMembers,
    invitedMembersLoadError: state => state.invitedMembersLoadError
  },
  actions,
  mutations
}
