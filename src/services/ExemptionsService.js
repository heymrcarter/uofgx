import axios from 'axios'

export function getExemptionsForClan(clanId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.EXEMPTIONS_ENDPOINT}/${clanId}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}

export function grantExemptionForMember(clanId, exemption) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.EXEMPTIONS_ENDPOINT}/${clanId}`, exemption)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}
