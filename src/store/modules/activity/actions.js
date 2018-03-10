import * as activityService from '@/services/ActivityService'

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
