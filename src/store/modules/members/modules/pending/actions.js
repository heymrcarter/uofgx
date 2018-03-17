import * as clanService from '@/services/ClanService'

export function getPendingMembers({ commit, rootState, rootGetters }) {
  return new Promise((resolve, reject) => {
    commit('START_LOADING')
    commit('RESET_LOAD_ERROR')
    clanService
      .getPendingMembers(rootGetters.clanId, rootState.session.accessToken)
      .then(response => {
        commit('FINISH_LOADING')
        commit('SET_PENDING_MEMBERS', response.results)

        setTimeout(() => {
          commit('RELOAD_PENDING_MEMBERS')
        }, 1000 * 60 * 15)

        resolve()
      })
      .catch(error => {
        commit('FINISH_LOADING')
        commit('LOAD_ERROR')
        reject(error)
      })
  })
}

export function approvePendingMemberships({ commit, rootGetters, rootState }, membershipIds) {
  return new Promise((resolve, reject) => {
    clanService
      .approveMembershipRequest(rootGetters.clanId, membershipIds, rootState.session.accessToken)
      .then(response => {
        commit('APPROVE_MEMBERSHIPS', membershipIds)
        resolve()
      })
      .catch(error => reject(error))
  })
}

export function denyPendingMemberships({ commit, rootGetters, rootState }, membershipIds) {
  return new Promise((resolve, reject) => {
    clanService
      .denyMembershipRequest(rootGetters.clanId, membershipIds, rootState.session.accessToken)
      .then(response => {
        commit('DENY_MEMBERSHIPS', membershipIds)
        resolve()
      })
      .catch(error => reject(error))
  })
}
