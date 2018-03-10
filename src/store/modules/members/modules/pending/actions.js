import * as clanService from '@/services/ClanService'

export function getPendingMembers({ commit, state, rootState }) {
  return new Promise((resolve, reject) => {
    clanService
      .getPendingMembers(process.env.CLAN_ID, rootState.session.accessToken)
      .then(response => {
        commit('SET_PENDING_MEMBERS', response.results)
        resolve()
      })
      .catch(error => reject(error))
  })
}

export function approvePendingMemberships({ commit, state, rootState }, membershipIds) {
  return new Promise((resolve, reject) => {
    clanService
      .approveMembershipRequest(process.env.CLAN_ID, membershipIds, rootState.session.accessToken)
      .then(response => {
        commit('APPROVE_MEMBERSHIPS', membershipIds)
        resolve()
      })
      .catch(error => reject(error))
  })
}

export function denyPendingMemberships({ commit, state, rootState }, membershipIds) {
  return new Promise((resolve, reject) => {
    clanService
      .denyMembershipRequest(process.env.CLAN_ID, membershipIds, rootState.session.access_token)
      .then(response => {
        commit('DENY_MEMBERSHIPS', membershipIds)
        resolve()
      })
      .catch(error => reject(error))
  })
}
