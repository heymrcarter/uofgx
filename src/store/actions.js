import * as clanService from '../services/ClanService'
import * as accessService from '../services/AccessService'
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
  getCharactersForMember({ commit, state }, membershipId) {
    return new Promise((resolve, reject) => {
      if (state.charactersCache[membershipId]) {
        const characters = state.charactersCache[membershipId]
        commit('SET_ACTIVE_MEMBER', { characters, membershipId })
        resolve(characters)
        return
      }

      memberService
        .getMemberCharacters(membershipId)
        .then(characters => {
          commit('CACHE_MEMBER_CHARACTERS', { characters, membershipId })
          commit('SET_ACTIVE_MEMBER', { characters, membershipId })
          resolve(characters)
        })
        .catch(error => reject(error))
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
  checkAccessForMember({ commit, state }, session) {
    return new Promise((resolve, reject) => {
      memberService
        .isMemberAdmin(session.membership_id, session.access_token)
        .then(isAdmin => {
          if (isAdmin) {
            commit('GRANT_ACCESS', session.membership_id)

            setTimeout(() => {
              commit('SESSION_EXPIRED')
            }, state.session.expires_in * 1000)
          }

          resolve(isAdmin)
        })
        .catch(error => reject(error))
    })
  },
  getCharacterActivity({ commit }, { membershipId, characterId }) {
    return new Promise((resolve, reject) => {
      memberService
        .getActivityForMemberCharacter(membershipId, characterId)
        .then(activity => resolve(activity))
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
  },
  getRecentActivityBreakdown({ commit }, { membershipId, characterId }) {
    return new Promise((resolve, reject) => {
      memberService
        .getRecentActivityBreakdownForMemberCharacter(membershipId, characterId)
        .then(recentActivityBreakdown => resolve(recentActivityBreakdown))
        .catch(error => reject(error))
    })
  },
  getRecentActivityByDate({ commit }, { membershipId, characterId }) {
    return new Promise((resolve, reject) => {
      memberService
        .getRecentActivityByDateForMemberCharacter(membershipId, characterId)
        .then(recentActivityByDate => resolve(recentActivityByDate))
        .catch(error => reject(error))
    })
  },
  getPendingMembers({ commit, state }) {
    return new Promise((resolve, reject) => {
      clanService
        .getPendingMembers(process.env.CLAN_ID, state.session.access_token)
        .then(response => {
          commit('SET_PENDING_MEMBERS', response.results)
          resolve()
        })
        .catch(error => reject(error))
    })
  },
  getInvitedMembers({ commit, state }) {
    return new Promise((resolve, reject) => {
      clanService
        .getInvitedMembers(process.env.CLAN_ID, state.session.access_token)
        .then(response => {
          commit('SET_INVITED_MEMBERS', response.results)
          resolve()
        })
        .catch(error => reject(error))
    })
  },
  approvePendingMemberships({ commit, state }, membershipIds) {
    return new Promise((resolve, reject) => {
      clanService
        .approveMembershipRequest(process.env.CLAN_ID, membershipIds, state.session.access_token)
        .then(response => {
          commit('APPROVE_MEMBERSHIPS', membershipIds)
          resolve()
        })
        .catch(error => reject(error))
    })
  },
  denyPendingMemberships({ commit, state }, membershipIds) {
    return new Promise((resolve, reject) => {
      clanService
        .denyMembershipRequest(process.env.CLAN_ID, membershipIds, state.session.access_token)
        .then(response => {
          commit('DENY_MEMBERSHIPS', membershipIds)
          resolve()
        })
        .catch(error => reject(error))
    })
  },
  rescindMembershipInvitation({ commit, state }, membershipId) {
    return new Promise((resolve, reject) => {
      clanService
        .rescindMembershipInvitation(process.env.CLAN_ID, membershipId, state.session.access_token)
        .then(response => {
          commit('RESCIND_INVITATION', membershipId)
          resolve()
        })
        .catch(error => reject(error))
    })
  },
  setActiveMember({ commit }, membershipId) {
    commit('SET_ACTIVE_MEMBER', { membershipId, characters: undefined })
  }
}
