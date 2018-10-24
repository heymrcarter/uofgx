import * as clanService from '../services/ClanService'

export function setClanId({ commit }, clanId) {
  commit('SET_CLAN_ID', clanId)
}

export function setClanName({ commit }, clanName) {
  commit('SET_CLAN_NAME', clanName)
}

export function setMembershipType({ commit }, membershipType) {
  commit('SET_MEMBERSHIP_TYPE', membershipType)
}

export function getWeeklyMilestones({ commit, rootState }) {
  return new Promise((resolve, reject) => {
    commit('START_LOADING_MILESTONES')
    clanService
      .getWeeklyMilestones(rootState.clanId)
      .then(milestones => {
        commit('SET_CLAN_MILESTONES', milestones)

        setTimeout(() => {
          commit('RELOAD_WEEKLY_MILESTONES')
        }, 1000 * 60 * 15)

        resolve()
      })
      .catch(error => {
        commit('MILESTONE_LOAD_ERROR')
        reject(error)
      })
      .finally(() => {
        commit('FINISH_LOADING_MILESTONES')
      })
  })
}
