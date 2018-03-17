export function SET_INVITED_MEMBERS(state, invitedMembers) {
  state.members = invitedMembers
}

export function RESCIND_INVITATION(state, membershipId) {
  let index = state.members.findIndex(m => m.destinyUserInfo.membershipId === membershipId)
  state.members[index].resolveState = 3
}

export function START_LOADING(state) {
  state.isLoadingInvitedMembers = true
  state.didLoadInvitedMembers = false
}

export function FINISH_LOADING(state) {
  state.isLoadingInvitedMembers = false
  state.didLoadInvitedMembers = true
}

export function RESET_LOAD_ERROR(state) {
  state.invitedMembersLoadError = false
}

export function LOAD_ERROR(state) {
  state.invitedMembersLoadError = true
}

export function RELOAD_INVITED_MEMBERS(state) {
  state.didLoadInvitedMembers = false
}
