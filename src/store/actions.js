import * as clanService from '../services/ClanService'
import * as accessService from '../services/AccessService'

export default {
  getClanMembers({ commit }) {
    return new Promise((resolve, reject) => {
      clanService.getMembers().then(members => {
        commit('SET_CLAN_MEMBERS', members)
        resolve()
      })
    })
  },
  getInactiveMembers({ commit, state }) {
    return new Promise(resolve => {
      clanService.getInactiveMembers(state.clanMembers).then(inactiveMembers => {
        commit('SET_INACTIVE_MEMBERS', inactiveMembers)
        resolve()
      })
    })
  },
  getCharactersForMember({ commit }, { xboxMembershipId, xboxUserName }) {
    return new Promise((resolve, reject) => {
      clanService.getMemberCharacters(xboxMembershipId).then(characters => {
        commit('SET_ACTIVE_MEMBER', { gamertag: xboxUserName, characters })
        resolve()
      })
    })
  },
  resetActiveMember({ commit }) {
    commit('RESET_ACTIVE_MEMBER')
  },
  getAccessToken({ commit }, authorizationCode) {
    return new Promise((resolve, reject) => {
      accessService
        .getAccessToken(authorizationCode)
        .then(accessResponse => {
          accessResponse.hasAccess = false
          commit('SET_SESSION', accessResponse)
          resolve(accessResponse)
        })
        .catch(error => reject(error))
    })
  },
  checkAccessForMember({ commit }, session) {
    return new Promise((resolve, reject) => {
      clanService
        .isMemberAdmin(session.membership_id, session.access_token)
        .then(isAdmin => {
          if (isAdmin) {
            commit('GRANT_ACCESS', session.membership_id)
          }

          resolve(isAdmin)
        })
        .catch(error => reject(error))
    })
  }
}
