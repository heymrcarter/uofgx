import * as exemptionService from '@/services/ExemptionsService'

export function getExemptions({ commit }) {
  return new Promise((resolve, reject) => {
    exemptionService
      .getExemptionsForClan(process.env.CLAN_ID)
      .then(exemptions => {
        commit('SET_EXEMPTIONS', exemptions)
        resolve()
      })
      .catch(error => reject(error))
  })
}

export function grantExemption({ commit, state }, exemption) {
  return new Promise((resolve, reject) => {
    exemption.adminMembershipId = state.session.membership_id
    exemption.adminMembershipType = 'bungienet'

    exemptionService
      .grantExemptionForMember(process.env.CLAN_ID, exemption)
      .then(savedExemption => {
        commit('SAVE_EXEMPTION', savedExemption)
        resolve()
      })
      .catch(error => reject(error))
  })
}

export function editExemption({ commit }, exemption) {
  return new Promise((resolve, reject) => {
    exemptionService
      .editExemption(process.env.CLAN_ID, exemption)
      .then(updatedExemption => {
        commit('LIFT_EXEMPTION', updatedExemption)
        resolve()
      })
      .catch(error => reject(error))
  })
}
