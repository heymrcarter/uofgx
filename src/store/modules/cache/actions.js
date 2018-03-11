export function cacheMemberCharacters({ commit }, { membershipId, characters }) {
  commit('CACHE_MEMBER_CHARACTERS', { membershipId, characters })
}
