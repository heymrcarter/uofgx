import * as clanService from '@/services/ClanService'

export function getClanMembers({ commit }) {
  return new Promise((resolve, reject) => {
    clanService.getMembers().then(members => {
      commit('SET_CLAN_MEMBERS', members)
      resolve()
    })
  })
}
