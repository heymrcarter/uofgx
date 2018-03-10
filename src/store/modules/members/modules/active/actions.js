export function reset({ commit }) {
  commit('RESET_ACTIVE_MEMBER')
}

export function set({ commit, rootState }, member) {
  member.gamertag = rootState.clanMembers.find(m => m.xboxMembershipId === member.membershipId).xboxUserName
  commit('SET_ACTIVE_MEMBER', member)
}
