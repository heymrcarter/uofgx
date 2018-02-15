import * as clanService from '../services/ClanService'
import * as accessService from '../services/AccessService'
import * as exemptionService from '../services/ExemptionsService'
import * as memberService from '../services/MemberService'
import * as activityService from '../services/ActivityService'

export default {
  getClanMembers({ commit }) {
    return new Promise((resolve, reject) => {
      clanService.getMembers().then(members => {
        commit('SET_CLAN_MEMBERS', members)
        resolve()
      })
    })
  },
  getActivityReport({ commit }) {
    return new Promise(resolve => {
      clanService.getActivityReport(process.env.CLAN_ID).then(report => {
        commit('SET_ACTIVITY_REPORT', report)
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
  },
  getExemptions({ commit }) {
    return new Promise((resolve, reject) => {
      exemptionService
        .getExemptionsForClan(process.env.CLAN_ID)
        .then(exemptions => {
          commit('SET_EXEMPTIONS', exemptions)
          resolve()
        })
        .catch(error => reject(error))
    })
  },
  grantExemption({ commit, state }, exemption) {
    return new Promise((resolve, reject) => {
      exemption.adminMembershipId = state.session.membership_id
      exemption.adminMembershipType = 'bungienet'

      exemptionService
        .grantExemptionForMember(process.env.CLAN_ID, exemption)
        .then(savedExemption => {
          commit('SAVE_EXEMPTION', savedExemption)
          resolve()
        })
        .catch(error => reject(error))
    })
  },
  getCharacterActivity({ commit }, characterActivityPayload) {
    return new Promise((resolve, reject) => {
      memberService
        .getActivityForMemberCharacter(characterActivityPayload.membershipId, characterActivityPayload.characterId)
        .then(activity => {
          commit('SET_ACTIVE_MEMBER_CHARACTER_ACTIVITY', activity)
          resolve()
        })
        .catch(error => reject(error))
    })
  },
  getActivityDetails({ commit }, activityId) {
    return new Promise((resolve, reject) => {
      activityService
        .getPostGameCarnageReport(activityId)
        .then(activityDetails => {
          commit('SET_ACTIVITY_DETAILS', activityDetails)
          resolve(activityDetails)
        })
        .catch(error => reject(error))
    })
  }
}
