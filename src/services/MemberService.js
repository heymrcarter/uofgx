import { get } from '@/utils/network-util'
import { mapCharacters } from '@/mappers/character-mapper'

export function getMemberCharacters(membershipType, membershipId) {
  return new Promise((resolve, reject) => {
    get(`/member/${membershipType}/${membershipId}/characters`)
      .then(response => {
        resolve(mapCharacters(response.data))
      })
      .catch(error => reject(error))
  })
}

export function getActivityForMemberCharacter(membershipType, membershipId, characterId) {
  return new Promise((resolve, reject) => {
    get(`/member/${membershipType}/${membershipId}/activity/${characterId}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}

export function getRecentActivityBreakdownForMemberCharacter(membershipType, membershipId, characterId) {
  return new Promise((resolve, reject) => {
    get(`/member/${membershipType}/${membershipId}/activity/recent/${characterId}/activity-breakdown`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export function getRecentActivityByDateForMemberCharacter(membershipType, membershipId, characterId) {
  return new Promise((resolve, reject) => {
    get(`/member/${membershipType}/${membershipId}/activity/recent/${characterId}/activity-by-date`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export function isMemberAdmin(membershipId, bearerToken) {
  return new Promise((resolve, reject) => {
    get(`/member/${membershipId}`)
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
      .catch(error => reject(error))
  })
}

export function getAdminGroups(membershipId) {
  return new Promise((resolve, reject) => {
    get(`/member/254/${membershipId}/admin-groups`).then(response => resolve(response.data))
  })
}

export function getMemberExpansions(membershipType, membershipId) {
  return new Promise((resolve, reject) => {
    get(`/member/${membershipType}/${membershipId}/expansions`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}
