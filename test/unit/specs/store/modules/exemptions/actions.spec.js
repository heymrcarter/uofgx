describe('exemptions actions', () => {
  let subject, exemptionService, commit

  beforeEach(() => {
    commit = td.function()
    exemptionService = td.replace('@/services/ExemptionsService')
    subject = require('@/store/modules/exemptions/actions')
  })

  describe('grantExemption', () => {
    beforeEach(async() => {
      const exemption = {
        adminMembershipId: 'membership-id',
        adminMembershipType: 'bungienet'
      }
      const rootState = {
        clanId: 'clan-id',
        session: {
          membershipId: 'membership-id'
        }
      }
      td.when(exemptionService.grantExemptionForMember('clan-id', exemption)).thenResolve('saved-exemption')
      await subject.grantExemption({ commit, rootState }, exemption)
    })

    it('sends the exemption to the server and saves it in the store', () => {
      td.verify(commit('SAVE_EXEMPTION', 'saved-exemption'))
    })
  })

  describe('getExemptions', () => {
    beforeEach(async() => {
      td.when(exemptionService.getExemptionsForClan('clan-id')).thenResolve('the exemptions')
      const rootState = {
        clanId: 'clan-id'
      }
      await subject.getExemptions({ commit, rootState }, 'clan-id')
    })

    it('fetches the exemptions and saves them in the store', () => {
      td.verify(commit('SET_EXEMPTIONS', 'the exemptions'))
    })
  })

  describe('editExemption', () => {
    beforeEach(async() => {
      td.when(exemptionService.editExemption('clan-id', 'the-exemption')).thenResolve('the-updated-exemption')
      const rootState = { clanId: 'clan-id' }
      await subject.editExemption({ commit, rootState }, 'the-exemption')
    })

    it('sends the edit to the server and saves the updated exemption', () => {
      td.verify(commit('LIFT_EXEMPTION', 'the-updated-exemption'))
    })
  })
})
