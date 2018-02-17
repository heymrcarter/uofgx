import { get } from '@/utils/network-util'
import { mapResponseToView } from '../mappers/clan-members-mapper'

export function getMembers() {
  return new Promise((resolve, reject) => {
    get(`/clan/${process.env.CLAN_ID}/members`)
      .then(response => resolve(mapResponseToView(response.data)))
      .catch(error => reject(error))
  })
}

export function getActivityReport(clanId) {
  return new Promise((resolve, reject) => {
    get(`/clan/${clanId}/activity-report`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}
