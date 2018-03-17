import * as clanService from '@/services/ClanService'

export function getInvitedMembers({ commit, rootGetters, rootState }) {
  return new Promise((resolve, reject) => {
    commit('START_LOADING')
    commit('RESET_LOAD_ERROR')
    clanService
      .getInvitedMembers(rootGetters.clanId, rootState.session.accessToken)
      .then(response => {
        commit('FINISH_LOADING')
        commit('SET_INVITED_MEMBERS', response.results)

        setTimeout(() => {
          commit('RELOAD_INVITED_MEMBERS')
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

export function rescindMembershipInvitation({ commit, rootGetters, rootState }, membershipId) {
  return new Promise((resolve, reject) => {
    clanService
      .rescindMembershipInvitation(rootGetters.clanId, membershipId, rootState.session.accessToken)
      .then(response => {
        commit('RESCIND_INVITATION', membershipId)
        resolve()
      })
      .catch(error => reject(error))
  })
}
