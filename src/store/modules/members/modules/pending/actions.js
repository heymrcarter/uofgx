import * as clanService from '@/services/ClanService'

export function getPendingMembers({ commit, rootState, getters }) {
  return new Promise((resolve, reject) => {
    clanService
      .getPendingMembers(getters.clanId, rootState.session.accessToken)
      .then(response => {
        commit('SET_PENDING_MEMBERS', response.results)
        resolve()
      })
      .catch(error => reject(error))
  })
}

export function approvePendingMemberships({ commit, getters, rootState }, membershipIds) {
  return new Promise((resolve, reject) => {
    clanService
      .approveMembershipRequest(getters.clanId, membershipIds, rootState.session.accessToken)
      .then(response => {
        commit('APPROVE_MEMBERSHIPS', membershipIds)
        resolve()
      })
      .catch(error => reject(error))
  })
}

export function denyPendingMemberships({ commit, getters, rootState }, membershipIds) {
  return new Promise((resolve, reject) => {
    clanService
      .denyMembershipRequest(getters.clanId, membershipIds, rootState.session.accessToken)
      .then(response => {
        commit('DENY_MEMBERSHIPS', membershipIds)
        resolve()
      })
      .catch(error => reject(error))
  })
}
