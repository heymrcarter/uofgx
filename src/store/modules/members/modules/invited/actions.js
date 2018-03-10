import * as clanService from '@/services/ClanService'

export function getInvitedMembers({ commit, state, rootState }) {
  return new Promise((resolve, reject) => {
    clanService
      .getInvitedMembers(process.env.CLAN_ID, rootState.session.accessToken)
      .then(response => {
        commit('SET_INVITED_MEMBERS', response.results)
        resolve()
      })
      .catch(error => reject(error))
  })
}

export function rescindMembershipInvitation({ commit, state, rootState }, membershipId) {
  return new Promise((resolve, reject) => {
    clanService
      .rescindMembershipInvitation(process.env.CLAN_ID, membershipId, rootState.session.accessToken)
      .then(response => {
        commit('RESCIND_INVITATION', membershipId)
        resolve()
      })
      .catch(error => reject(error))
  })
}
