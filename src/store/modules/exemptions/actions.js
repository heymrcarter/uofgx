import * as exemptionService from '@/services/ExemptionsService'

export function getExemptions({ commit, rootState }) {
  return new Promise((resolve, reject) => {
    exemptionService
      .getExemptionsForClan(rootState.clanId)
      .then(exemptions => {
        commit('SET_EXEMPTIONS', exemptions)
        resolve()
      })
      .catch(error => reject(error))
  })
}

export function grantExemption({ commit, rootState }, exemption) {
  return new Promise((resolve, reject) => {
    exemption.adminMembershipId = rootState.session.membershipId
    exemption.adminMembershipType = 'bungienet'

    exemptionService
      .grantExemptionForMember(rootState.clanId, exemption)
      .then(savedExemption => {
        commit('SAVE_EXEMPTION', savedExemption)
        resolve()
      })
      .catch(error => reject(error))
  })
}

export function editExemption({ commit, rootState }, exemption) {
  return new Promise((resolve, reject) => {
    exemptionService
      .editExemption(rootState.clanId, exemption)
      .then(updatedExemption => {
        commit('LIFT_EXEMPTION', updatedExemption)
        resolve()
      })
      .catch(error => reject(error))
  })
}
