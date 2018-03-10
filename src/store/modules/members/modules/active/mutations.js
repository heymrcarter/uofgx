export function RESET_ACTIVE_MEMBER(state) {
  state.member = undefined
}

export function SET_ACTIVE_MEMBER(state, member) {
  state.member = member
  state.characterActivity = undefined
}
