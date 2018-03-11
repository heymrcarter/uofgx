import * as memberService from '@/services/MemberService'

export function reset({ commit }) {
  commit('RESET_ACTIVE_MEMBER')
}

export function set({ commit, rootState }, member) {
  member.gamertag = rootState.members.list.find(m => m.xboxMembershipId === member.membershipId).xboxUserName
  commit('SET_ACTIVE_MEMBER', member)
}

export function getCharactersForMember({ commit, dispatch, rootState }, membershipId) {
  return new Promise((resolve, reject) => {
    if (rootState.cache.characters[membershipId]) {
      const characters = rootState.cache.characters[membershipId]
      commit('SET_ACTIVE_MEMBER_CHARACTERS', characters)
      resolve(characters)
      return
    }

    memberService
      .getMemberCharacters(membershipId)
      .then(characters => {
        dispatch('cacheMemberCharacters', { membershipId, characters }, { root: true })
        commit('SET_ACTIVE_MEMBER_CHARACTERS', characters)
        resolve(characters)
      })
      .catch(error => reject(error))
  })
}
