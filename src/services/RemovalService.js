import { get, post } from '../utils/network-util'

export function getClanRemovalHistory(clanId) {
  return new Promise((resolve, reject) => {
    get(`/removal/${clanId}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export function removeMemberFromClan(clanId, removalPayload, bearerToken) {
  return new Promise((resolve, reject) => {
    const config = { Authorization: `Bearer ${bearerToken}` }
    post(`/removal/${clanId}`, removalPayload, config)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}
