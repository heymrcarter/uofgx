import * as clanService from '@/services/ClanService'

export function getActivityReport({ commit }) {
  return new Promise(resolve => {
    clanService.getActivityReport(process.env.CLAN_ID).then(report => {
      commit('SET_ACTIVITY_REPORT', report)
      resolve()
    })
  })
}
