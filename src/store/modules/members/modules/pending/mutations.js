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

export function START_LOADING(state) {
  state.isLoadingPendingMembers = true
  state.didLoadPendingMembers = false
}

export function FINISH_LOADING(state) {
  state.isLoadingPendingMembers = false
  state.didLoadPendingMembers = true
}

export function RESET_LOAD_ERROR(state) {
  state.pendingMembersLoadError = false
}

export function LOAD_ERROR(state) {
  state.pendingMembersLoadError = true
}

export function RELOAD_PENDING_MEMBERS(state) {
  state.didLoadPendingMembers = false
}
