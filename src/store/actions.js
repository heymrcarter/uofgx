import * as memberService from '../services/MemberService'

export default {
  getCharactersForMember({ commit, state, dispatch }, membershipId) {
    return new Promise((resolve, reject) => {
      if (state.cache.characters[membershipId]) {
        const characters = state.cache.characters[membershipId]
        dispatch('members/active/set', { characters, membershipId }, { root: true })
        resolve(characters)
        return
      }

      memberService
        .getMemberCharacters(membershipId)
        .then(characters => {
          commit('CACHE_MEMBER_CHARACTERS', { characters, membershipId })
          dispatch('members/active/set', { characters, membershipId }, { root: true })
          resolve(characters)
        })
        .catch(error => reject(error))
    })
  },
  getCharacterActivity({ commit }, { membershipId, characterId }) {
    return new Promise((resolve, reject) => {
      memberService
        .getActivityForMemberCharacter(membershipId, characterId)
        .then(activity => resolve(activity))
        .catch(error => reject(error))
    })
  },
  getRecentActivityBreakdown({ commit }, { membershipId, characterId }) {
    return new Promise((resolve, reject) => {
      memberService
        .getRecentActivityBreakdownForMemberCharacter(membershipId, characterId)
        .then(recentActivityBreakdown => resolve(recentActivityBreakdown))
        .catch(error => reject(error))
    })
  },
  getRecentActivityByDate({ commit }, { membershipId, characterId }) {
    return new Promise((resolve, reject) => {
      memberService
        .getRecentActivityByDateForMemberCharacter(membershipId, characterId)
        .then(recentActivityByDate => resolve(recentActivityByDate))
        .catch(error => reject(error))
    })
  }
}
