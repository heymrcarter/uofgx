export function SET_REMOVAL_HISTORY(state, history) {
  state.removalHistory = history
}

export function ADD_REMOVAL_TO_HISTORY(state, removal) {
  state.removalHistory.push(removal)
}

export function ADD_REMOVALS_TO_HISTORY(state, members) {
  state.removalHistory = state.removalHistory.concat(members)
}
