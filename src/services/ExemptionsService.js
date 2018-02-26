import { get, post, put } from '@/utils/network-util'

export function getExemptionsForClan(clanId) {
  return new Promise((resolve, reject) => {
    get(`/exemptions/${clanId}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export function grantExemptionForMember(clanId, exemption) {
  return new Promise((resolve, reject) => {
    post(`/exemptions/${clanId}`, exemption)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export function editExemption(clanId, exemption) {
  return new Promise((resolve, reject) => {
    put(`/exemptions/${clanId}/${exemption.membershipId}`, exemption)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}
