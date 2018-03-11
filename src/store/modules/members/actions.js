import * as clanService from '@/services/ClanService'

export function getClanMembers({ commit }) {
  return new Promise((resolve, reject) => {
    commit('START_LOADING_MEMBERS')
    clanService
      .getMembers()
      .then(members => {
        commit('SET_CLAN_MEMBERS', members)
        commit('FINISH_LOADING_MEMBERS')

        setTimeout(() => {
          commit('RELOAD_MEMBERS')
        }, 1000 * 60 * 15)

        resolve()
      })
      .catch(error => {
        commit('FINISH_LOADING_MEMBERS')
        reject(error)
      })
  })
}
