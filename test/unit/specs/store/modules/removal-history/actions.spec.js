describe('removal history actions', () => {
  let subject, removalService, commit, rootState

  beforeEach(() => {
    commit = td.function()
    rootState = { clanId: 'clan-id' }
    removalService = td.replace('@/services/RemovalService')
    subject = require('@/store/modules/removal-history/actions')
  })

  describe('getRemovalHistory', () => {
    beforeEach(done => {
      td.when(removalService.getClanRemovalHistory('clan-id')).thenResolve('the-history')
      subject.getRemovalHistory({ commit, rootState }).finally(done)
    })

    it('saves the history', () => {
      td.verify(commit('SET_REMOVAL_HISTORY', 'the-history'))
    })
  })

  describe('removeMember', () => {
    let payload
    beforeEach(done => {
      payload = {}
      rootState.session = {}
      rootState.session.accessToken = 'access-token'
      rootState.session.membershipId = 'membership-id'

      const expectedPayload = {
        adminMembershipId: 'membership-id',
        adminMembershipType: 'bungienet'
      }

      td.when(removalService.removeMemberFromClan('clan-id', expectedPayload, 'access-token')).thenResolve('the-removal')

      subject.removeMember({ commit, rootState }, payload).finally(done)
    })

    it('removes the member from the roster', () => {
      td.verify(commit('REMOVE_MEMBER', 'the-removal'))
    })
  })
})
