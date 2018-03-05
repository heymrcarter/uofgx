import { get, post } from '../utils/network-util'

export function getClanRemovalHistory(clanId) {
  return new Promise((resolve, reject) => {
    get(`/removal/${clanId}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export function removeMemberFromClan(clanId, removalPayload) {
  return new Promise((resolve, reject) => {
    post(`/removal/${clanId}`, removalPayload)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}
