import * as memberService from '@/services/MemberService'

export function getCharactersForMember({ commit, state, rootState }, membershipId) {
  return new Promise((resolve, reject) => {
    if (state.memberCharacters[membershipId]) {
      resolve()
      return
    }

    memberService
      .getMemberCharacters(rootState.membershipType, membershipId)
      .then(characters => {
        commit('SET_MEMBER_CHARACTERS', { membershipId, characters })
        resolve()
      })
      .catch(error => reject(error))
  })
}
