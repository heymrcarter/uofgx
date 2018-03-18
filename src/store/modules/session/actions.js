import * as accessService from '@/services/AccessService'
import * as memberService from '@/services/MemberService'

export function getAccessToken({ commit }, authorizationCode) {
  return new Promise((resolve, reject) => {
    accessService
      .getAccessToken(authorizationCode)
      .then(accessResponse => {
        commit('SET_SESSION', accessResponse)
        resolve(accessResponse)
      })
      .catch(error => reject(error))
  })
}

export function checkAccessForMember({ commit }, session) {
  return new Promise((resolve, reject) => {
    memberService
      .isMemberAdmin(session.membership_id, session.access_token)
      .then(isAdmin => {
        if (isAdmin) {
          commit('GRANT_ACCESS', session.membership_id)

          setTimeout(() => {
            commit('SESSION_EXPIRED')
          }, session.expires_in * 1000)
        }

        resolve(isAdmin)
      })
      .catch(error => reject(error))
  })
}

export function getUserGroups({ commit, dispatch }, session) {
  return new Promise(resolve => {
    memberService.getAdminGroups(session.membership_id).then(groups => {
      if (groups.length > 0) {
        commit('GRANT_ACCESS', session.membership_id)
        dispatch('setClanId', groups[0].groupId, { root: true })
        dispatch('setClanName', groups[0].groupName, { root: true })

        setTimeout(() => {
          commit('SESSION_EXPIRED')
        }, session.expires_in * 1000)

        resolve(groups)
      }
    })
  })
}
