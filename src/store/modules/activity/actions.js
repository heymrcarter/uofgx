import * as activityService from '@/services/ActivityService'
import * as memberService from '@/services/MemberService'

export function getActivityDetails({ commit }, activityId) {
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

export function getRecentActivityBreakdown({ commit, rootState }, { membershipId, characterId }) {
  return new Promise((resolve, reject) => {
    memberService
      .getRecentActivityBreakdownForMemberCharacter(rootState.membershipType, membershipId, characterId)
      .then(recentActivityBreakdown => resolve(recentActivityBreakdown))
      .catch(error => reject(error))
  })
}

export function getRecentActivityByDate({ commit, rootState }, { membershipId, characterId }) {
  return new Promise((resolve, reject) => {
    memberService
      .getRecentActivityByDateForMemberCharacter(rootState.membershipType, membershipId, characterId)
      .then(recentActivityByDate => resolve(recentActivityByDate))
      .catch(error => reject(error))
  })
}

export function getCharacterActivity({ commit, rootState }, { membershipId, characterId }) {
  return new Promise((resolve, reject) => {
    memberService
      .getActivityForMemberCharacter(rootState.membershipType, membershipId, characterId)
      .then(activity => resolve(activity))
      .catch(error => reject(error))
  })
}
