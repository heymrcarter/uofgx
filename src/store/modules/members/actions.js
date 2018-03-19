import * as clanService from '@/services/ClanService'

export function getClanMembers({ commit, rootState }) {
  return new Promise((resolve, reject) => {
    commit('START_LOADING_MEMBERS')
    commit('CLEAR_LOAD_ERROR')
    clanService
      .getMembers(rootState.clanId)
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
        commit('SET_LOAD_ERROR')
        reject(error)
      })
  })
}
