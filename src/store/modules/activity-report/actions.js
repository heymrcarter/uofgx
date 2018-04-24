import * as clanService from '@/services/ClanService'

export function getActivityReport({ commit, rootState }) {
  return new Promise((resolve, reject) => {
    commit('START_LOADING')
    commit('RESET_LOAD_ERROR')
    clanService
      .getActivityReport(rootState.clanId)
      .then(report => {
        commit('FINISH_LOADING')
        commit('SET_ACTIVITY_REPORT', report)

        setTimeout(() => {
          commit('RELOAD')
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

export function removeMemberFromReport({ commit }, membershipId) {
  commit('REMOVE_MEMBER', membershipId)
}
