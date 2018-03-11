export function SET_CLAN_MEMBERS(state, members) {
  state.list = members
}

export function START_LOADING_MEMBERS(state) {
  state.isLoadingMembers = true
  state.didLoadMembers = false
}

export function FINISH_LOADING_MEMBERS(state) {
  state.isLoadingMembers = false
  state.didLoadMembers = true
}

export function RELOAD_MEMBERS(state) {
  state.didLoadMembers = false
}
