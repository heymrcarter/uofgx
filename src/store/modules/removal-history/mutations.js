export function SET_REMOVAL_HISTORY(state, history) {
  state.removalHistory = history
}

export function REMOVE_MEMBER(state, removal) {
  state.removalHistory.push(removal)
  const index = state.clanMembers.findIndex(m => m.xboxMembershipId === removal.removedMembershipId)
  state.clanMembers.splice(index, 1)
}
