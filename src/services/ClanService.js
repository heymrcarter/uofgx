import axios from 'axios'
import { mapResponseToView } from '../mappers/clan-members-mapper'
import { createActivityReport, sortByActivity } from '../mappers/activity-report-mapper'
import { mapCharacters } from '../mappers/character-mapper'

function addConfig(headers = {}) {
  return {
    baseURL: 'https://www.bungie.net/platform',
    headers: Object.assign({}, headers, {
      'X-API-Key': process.env.API_KEY
    }),
    withCredentials: true,
    timeout: 1000 * 30
  }
}

export function getMembers() {
  const config = {
    baseURL: 'https://uofgx-server.herokuapp.com',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return new Promise((resolve, reject) => {
    axios
      .get(`/clan/${process.env.CLAN_ID}/members`, config)
      .then(response => {
        resolve(mapResponseToView(response.data))
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function getMemberCharacters(membershipId) {
  return new Promise((resolve, reject) => {
    const config = {
      baseURL: 'https://uofgx-server.herokuapp.com',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    axios
      .get(`/member/${membershipId}/characters`, config)
      .then(response => {
        resolve(mapCharacters(response.data))
      })
      .catch(error => reject(error))
  })
}

export function getInactiveMembers(allMembers = []) {
  return new Promise((resolve, reject) => {
    const inactiveMembers = []
    allMembers.forEach(({ xboxMembershipType, xboxMembershipId }) => {
      axios
        .get(`/Destiny2/${xboxMembershipType}/Profile/${xboxMembershipId}?components=100`, addConfig())
        .then(response => {
          const activityReportForMember = createActivityReport(response.data.Response.profile.data)

          if (activityReportForMember.isInactive) {
            inactiveMembers.push(activityReportForMember)
          }
        })
        .catch(error => reject(error))
    })

    resolve(sortByActivity(inactiveMembers))
  })
}

export function isMemberAdmin(membershipId, bearerToken) {
  return new Promise((resolve, reject) => {
    const config = {
      baseURL: 'https://uofgx-server.herokuapp.com',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    axios
      .get(`/member/${membershipId}`, config)
      .then(response => {
        if (response.data.length <= 0) {
          resolve(false)
        }
        response.data.forEach(result => {
          if (result.member.groupId === process.env.CLAN_ID) {
            if (result.member.memberType >= 3) {
              resolve(true)
            } else {
              resolve(false)
            }
          }
        })
        resolve(false)
      })
      .catch(error => {
        console.log('--> ERROR!', error)
        if (axios.isCancel(error)) {
          console.log('axios cancel')
        }
        reject(error)
      })
  })
}
