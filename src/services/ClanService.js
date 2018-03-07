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

export function getPendingMembers(clanId, authToken) {
  return new Promise((resolve, reject) => {
    get(`/clan/${clanId}/members/pending`, {
      Authorization: `Bearer ${authToken}`
    })
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export function getInvitedMembers(clanId, authToken) {
  return new Promise((resolve, reject) => {
    get(`/clan/${clanId}/members/invited`, {
      Authorization: `Bearer ${authToken}`
    })
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}
