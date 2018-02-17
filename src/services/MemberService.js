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

export function getRecentActivityBreakdownForMemberCharacter(membershipId, characterId) {
  return new Promise((resolve, reject) => {
    const config = {
      baseURL: 'https://uofgx-server.cfapps.io',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    axios
      .get(`/member/${membershipId}/activity/recent/${characterId}/activity-breakdown`, config)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export function getRecentActivityByDateForMemberCharacter(membershipId, characterId) {
  return new Promise((resolve, reject) => {
    const config = {
      baseURL: 'https://uofgx-server.cfapps.io',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    axios
      .get(`/member/${membershipId}/activity/recent/${characterId}/activity-by-date`, config)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}
