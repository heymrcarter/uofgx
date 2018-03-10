export function SET_PENDING_MEMBERS(state, pendingMembers) {
  state.members = pendingMembers
}

export function APPROVE_MEMBERSHIPS(state, membershipIds) {
  membershipIds.forEach(membershipId => {
    let index = state.members.findIndex(m => m.destinyUserInfo.membershipId === membershipId)
    if (index > -1) {
      state.members[index].resolveState = 1
    }
  })
}

export function DENY_MEMBERSHIPS(state, membershipIds) {
  membershipIds.forEach(membershipId => {
    let index = state.members.findIndex(m => m.destinyUserInfo.membershipId === membershipId)
    if (index > -1) {
      state.members[index].resolveState = 2
    }
  })
}
