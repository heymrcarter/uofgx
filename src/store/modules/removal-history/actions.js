import * as removalService from '@/services/RemovalService'
import moment from 'moment-timezone'

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
    payload.removedMembershipType = rootState.membershipType
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

export function removeMembers({ commit, rootState, dispatch }, members) {
  return new Promise((resolve, reject) => {
    const removalDate = moment.utc()
    const payload = members.map(({ membershipId, gamertag }) => {
      return {
        removedMembershipId: membershipId,
        removedGamertag: gamertag,
        removalDate,
        adminMembershipId: rootState.session.membershipId,
        adminMembershipType: 'bungienet',
        removedMembershipType: rootState.membershipType
      }
    })

    removalService
      .removeMembersFromClan(rootState.clanId, payload, rootState.session.accessToken)
      .then(removedMembers => {
        commit('ADD_REMOVALS_TO_HISTORY', removedMembers)
        dispatch('members/removeClanMembers', removedMembers, { root: true })
        dispatch('removeMembersFromReport', removedMembers)
        resolve()
      })
      .catch(error => reject(error))
  })
}
