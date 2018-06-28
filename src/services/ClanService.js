import { get, post, put } from '@/utils/network-util'
import { mapResponseToView } from '@/mappers/clan-members-mapper'
import moment from 'moment-timezone'

export function getMembers(clanId) {
  return new Promise((resolve, reject) => {
    get(`/clan/${clanId}/members`)
      .then(response => {
        resolve(mapResponseToView(response.data))
      })
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

export function approveMembershipRequest(clanId, membershipType, membershipIds, authToken) {
  return new Promise((resolve, reject) => {
    const memberships = membershipIds.map(id => {
      return {
        membershipId: id,
        membershipType
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

export function denyMembershipRequest(clanId, membershipType, membershipIds, authToken) {
  return new Promise((resolve, reject) => {
    const memberships = membershipIds.map(id => {
      return {
        membershipId: id,
        membershipType
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

export function rescindMembershipInvitation(clanId, membershipType, membershipId, authToken) {
  return new Promise((resolve, reject) => {
    const headers = {
      Authorization: `Bearer ${authToken}`
    }

    post(`/clan/${clanId}/members/invited/rescind/${membershipType}/${membershipId}`, null, headers)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export function addNoteForMember(clanId, note) {
  return new Promise((resolve, reject) => {
    note.date = moment.utc()
    post(`/clan/${clanId}/members/${note.membershipId}/note`, note)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export function getNotesForMember(clanId, membershipId) {
  return new Promise((resolve, reject) => {
    get(`/clan/${clanId}/members/${membershipId}/note`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export function editMemberLevel(accessToken, clanId, membershipType, membershipId, memberLevel) {
  return new Promise((resolve, reject) => {
    const body = {
      membershipType,
      membershipId,
      memberType: memberLevel
    }

    const headers = {
      Authorization: `Bearer ${accessToken}`
    }

    put(`/clan/${clanId}/members/member-type`, body, headers)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export function getBannedMembers(clanId, authToken) {
  return new Promise((resolve, reject) => {
    get(`/clan/${clanId}/members/banned`, { Authorization: `Bearer ${authToken}` })
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}
