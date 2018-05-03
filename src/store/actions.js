export function setClanId({ commit }, clanId) {
  commit('SET_CLAN_ID', clanId)
}

export function setClanName({ commit }, clanName) {
  commit('SET_CLAN_NAME', clanName)
}

export function setMembershipType({ commit }, membershipType) {
  commit('SET_MEMBERSHIP_TYPE', membershipType)
}
