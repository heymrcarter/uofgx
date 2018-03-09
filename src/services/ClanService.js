import { get, post } from '@/utils/network-util'
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

export function approveMembershipRequest(clanId, membershipIds, authToken) {
  return new Promise((resolve, reject) => {
    const memberships = membershipIds.map(id => {
      return {
        membershipId: id,
        membershipType: 1
      }
    })

    const body = {
      memberships,
      message: ''
    }

    const headers = {
      Authorization: `Bearer ${authToken}`
    }

    post(`/clan/${clanId}/members/pending/approve`, body, headers)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export function denyMembershipRequest(clanId, membershipIds, authToken) {
  return new Promise((resolve, reject) => {
    const memberships = membershipIds.map(id => {
      return {
        membershipId: id,
        membershipType: 1
      }
    })

    const body = {
      memberships,
      message: ''
    }

    const headers = {
      Authorization: `Bearer ${authToken}`
    }

    post(`/clan/${clanId}/members/pending/deny`, body, headers)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export function rescindMembershipInvitation(clanId, membershipId, authToken) {
  return new Promise((resolve, reject) => {
    const headers = {
      Authorization: `Bearer ${authToken}`
    }

    post(
      `/clan/${clanId}/members/invited/rescind/${membershipId}`,
      null,
      headers
    )
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}
