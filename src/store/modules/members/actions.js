import * as clanService from '@/services/ClanService'
import * as memberService from '@/services/MemberService'

export function getClanMembers({ commit, rootState }) {
  return new Promise((resolve, reject) => {
    commit('START_LOADING_MEMBERS')
    commit('CLEAR_LOAD_ERROR')
    clanService
      .getMembers(rootState.clanId)
      .then(members => {
        commit('SET_CLAN_MEMBERS', members)
        commit('FINISH_LOADING_MEMBERS')

        setTimeout(() => {
          commit('RELOAD_MEMBERS')
        }, 1000 * 60 * 15)

        resolve()
      })
      .catch(error => {
        commit('FINISH_LOADING_MEMBERS')
        commit('SET_LOAD_ERROR')
        reject(error)
      })
  })
}

export function removeClanMember({ commit }, membershipId) {
  commit('REMOVE_CLAN_MEMBER', membershipId)
}

export function getExpansions({ commit, rootState, state }, membershipId) {
  return new Promise((resolve, reject) => {
    if (state.expansions[membershipId]) {
      resolve(state.expansions[membershipId])
      return
    }

    memberService
      .getMemberExpansions(rootState.membershipType, membershipId)
      .then(expansions => {
        commit('CACHE_MEMBER_EXPANSIONS', { membershipId, expansions })
        resolve(expansions)
      })
      .catch(error => reject(error))
  })
}
