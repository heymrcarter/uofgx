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

export function REMOVE_CLAN_MEMBERS(state, members) {
  members.forEach(member => {
    let index = state.list.findIndex(m => m.xboxMembershipId === member.removedMembershipId)
    state.list.splice(index, 1)
  })
}

export function CACHE_MEMBER_EXPANSIONS(state, { membershipId, expansions }) {
  Vue.set(state.expansions, membershipId, expansions)
}

export function UPDATE_MEMBER_LEVEL(state, { membershipId, memberLevel }) {
  const member = state.list.find(m => m.xboxMembershipId === membershipId)
  member.memberType = memberLevel
}

export function START_LOADING_BANNED_MEMBERS(state) {
  state.isLoadingBannedMembers = true
  state.didLoadBannedMembers = false
}

export function FINISH_LOADING_BANNED_MEMBERS(state) {
  state.isLoadingBannedMembers = false
  state.didLoadBannedMembers = true
}

export function CLEAR_BANNED_MEMBERS_LOAD_ERROR(state) {
  state.bannedMembersLoadError = false
}

export function SET_BANNED_MEMBERS_LOAD_ERROR(state) {
  state.bannedMembersLoadError = true
}

export function RELOAD_BANNED_MEMBERS(state) {
  state.didLoadBannedMembers = false
}

export function SET_BANNED_MEMBERS(state, bannedMembers) {
  state.bannedMembers = bannedMembers
}

export function UNBAN_MEMBER(state, { membershipType, membershipId }) {
  function isUnbannedMember({ destinyUserInfo }) {
    return destinyUserInfo.membershipType === membershipType && destinyUserInfo.membershipId === membershipId
  }

  const index = state.bannedMembers.findIndex(m => isUnbannedMember(m))

  state.bannedMembers.splice(index, 1)
}

export function BAN_MEMBER(state, membership) {
  state.bannedMembers.push({ destinyUserInfo: membership })
}
