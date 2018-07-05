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

export function editMemberLevel({ commit, rootState }, { membershipId, newLevel }) {
  return new Promise((resolve, reject) => {
    clanService
      .editMemberLevel(rootState.session.accessToken, rootState.clanId, rootState.membershipType, membershipId, newLevel)
      .then(() => {
        commit('UPDATE_MEMBER_LEVEL', { membershipId, memberLevel: newLevel })
        resolve()
      })
      .catch(error => reject(error))
  })
}

export function getBannedMembers({ commit, rootState }) {
  return new Promise((resolve, reject) => {
    commit('START_LOADING_BANNED_MEMBERS')
    commit('CLEAR_BANNED_MEMBERS_LOAD_ERROR')
    clanService
      .getBannedMembers(rootState.clanId, rootState.session.accessToken)
      .then(bannedMembers => {
        commit('SET_BANNED_MEMBERS', bannedMembers)
        commit('FINISH_LOADING_BANNED_MEMBERS')

        setTimeout(() => {
          commit('RELOAD_BANNED_MEMBERS')
        }, 1000 * 60 * 15)

        resolve()
      })
      .catch(error => {
        commit('FINISH_LOADING_BANNED_MEMBERS')
        commit('SET_BANNED_MEMBERS_LOAD_ERROR')
        reject(error)
      })
  })
}

export function unbanMember({ commit, rootState }, membershipId) {
  return new Promise((resolve, reject) => {
    clanService
      .unbanMember(rootState.clanId, rootState.membershipType, membershipId, rootState.session.accessToken)
      .then(membership => {
        commit('UNBAN_MEMBER', membership)
        resolve()
      })
      .catch(error => reject(error))
  })
}

export function banMember({ commit, rootState, dispatch }, membershipId) {
  return new Promise((resolve, reject) => {
    clanService
      .banMember(rootState.clanId, rootState.membershipType, membershipId, rootState.session.accessToken)
      .then(membership => {
        commit('BAN_MEMBER', membership)
        dispatch('getBannedMembers')
        dispatch('getClanMembers')
        resolve()
      })
      .catch(error => reject(error))
  })
}
