import axios from 'axios'

export function getActivityForMemberCharacter(membershipId, characterId) {
  return new Promise((resolve, reject) => {
    const config = {
      baseURL: 'https://uofgx-server.cfapps.io',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    axios
      .get(`/member/${membershipId}/activity/${characterId}`, config)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}
