import * as clanService from '../services/ClanService'
import * as accessService from '../services/AccessService'
import * as memberService from '../services/MemberService'

export default {
  getClanMembers({ commit }) {
    return new Promise((resolve, reject) => {
      clanService.getMembers().then(members => {
        commit('SET_CLAN_MEMBERS', members)
        resolve()
      })
    })
  },
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
  getAccessToken({ commit }, authorizationCode) {
    return new Promise((resolve, reject) => {
      accessService
        .getAccessToken(authorizationCode)
        .then(accessResponse => {
          accessResponse.hasAccess = false
          commit('SET_SESSION', accessResponse)
          resolve(accessResponse)
        })
        .catch(error => reject(error))
    })
  },
  checkAccessForMember({ commit, state }, session) {
    return new Promise((resolve, reject) => {
      memberService
        .isMemberAdmin(session.membership_id, session.access_token)
        .then(isAdmin => {
          if (isAdmin) {
            commit('GRANT_ACCESS', session.membership_id)

            setTimeout(() => {
              commit('SESSION_EXPIRED')
            }, state.session.expires_in * 1000)
          }

          resolve(isAdmin)
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
