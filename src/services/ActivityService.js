import { get } from '@/utils/network-util'

export function getPostGameCarnageReport(activityId) {
  return new Promise((resolve, reject) => {
    get(`/activity/${activityId}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}
