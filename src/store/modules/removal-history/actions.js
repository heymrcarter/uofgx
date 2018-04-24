import * as removalService from '@/services/RemovalService'

export function getRemovalHistory({ commit, rootState }) {
  return new Promise((resolve, reject) => {
    removalService
      .getClanRemovalHistory(rootState.clanId)
      .then(history => {
        commit('SET_REMOVAL_HISTORY', history)
        resolve()
      })
      .catch(error => reject(error))
  })
}

export function removeMember({ commit, rootState, dispatch }, payload) {
  return new Promise((resolve, reject) => {
    payload.adminMembershipId = rootState.session.membershipId
    payload.adminMembershipType = 'bungienet'
    removalService
      .removeMemberFromClan(rootState.clanId, payload, rootState.session.accessToken)
      .then(removal => {
        commit('ADD_REMOVAL_TO_HISTORY', removal)
        dispatch('members/removeClanMember', removal.removedMembershipId, { root: true })
        dispatch('removeMemberFromReport', removal.removedMembershipId)
        resolve()
      })
      .catch(error => reject(error))
  })
}
