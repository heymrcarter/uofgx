export function SET_INVITED_MEMBERS(state, invitedMembers) {
  state.members = invitedMembers
}

export function RESCIND_INVITATION(state, membershipId) {
  let index = state.members.findIndex(m => m.destinyUserInfo.membershipId === membershipId)
  state.members[index].resolveState = 3
}
