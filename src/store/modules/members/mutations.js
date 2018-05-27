import Vue from 'vue'

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

export function CLEAR_LOAD_ERROR(state) {
  state.loadMembersError = false
}

export function SET_LOAD_ERROR(state) {
  state.loadMembersError = true
}

export function REMOVE_CLAN_MEMBER(state, membershipId) {
  const index = state.list.findIndex(m => m.xboxMembershipId === membershipId)
  state.list.splice(index, 1)
}

export function CACHE_MEMBER_EXPANSIONS(state, { membershipId, expansions }) {
  Vue.set(state.expansions, membershipId, expansions)
}
