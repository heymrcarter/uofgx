export function SET_REMOVAL_HISTORY(state, history) {
  state.removalHistory = history
}

export function ADD_REMOVAL_TO_HISTORY(state, removal) {
  state.removalHistory.push(removal)
}
