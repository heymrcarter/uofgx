import * as removalService from '@/services/RemovalService'

export function getRemovalHistory({ commit }) {
  return new Promise((resolve, reject) => {
    removalService
      .getClanRemovalHistory(process.env.CLAN_ID)
      .then(history => {
        commit('SET_REMOVAL_HISTORY', history)
        resolve()
      })
      .catch(error => reject(error))
  })
}

export function removeMember({ commit, state }, payload) {
  return new Promise((resolve, reject) => {
    payload.adminMembershipId = state.session.membership_id
    payload.adminMembershipType = 'bungienet'
    removalService
      .removeMemberFromClan(process.env.CLAN_ID, payload, state.session.accessToken)
      .then(removal => {
        commit('REMOVE_MEMBER', removal)
        resolve()
      })
      .catch(error => reject(error))
  })
}
