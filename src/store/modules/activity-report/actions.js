import * as clanService from '@/services/ClanService'

export function getActivityReport({ commit, rootState }) {
  return new Promise(resolve => {
    clanService.getActivityReport(rootState.clanId).then(report => {
      commit('SET_ACTIVITY_REPORT', report)
      resolve()
    })
  })
}
