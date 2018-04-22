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
    let payload, dispatch
    beforeEach(done => {
      payload = {}
      rootState.session = {}
      rootState.session.accessToken = 'access-token'
      rootState.session.membershipId = 'membership-id'

      const expectedPayload = {
        adminMembershipId: 'membership-id',
        adminMembershipType: 'bungienet'
      }

      const response = { removedMembershipId: 'removed-membership-id' }
      td.when(removalService.removeMemberFromClan('clan-id', expectedPayload, 'access-token')).thenResolve(response)

      dispatch = td.function()

      subject.removeMember({ commit, rootState, dispatch }, payload).finally(done)
    })

    it('adds the removal to the removal history', () => {
      td.verify(commit('ADD_REMOVAL_TO_HISTORY', { removedMembershipId: 'removed-membership-id' }))
    })

    it('removes the member from the roster', () => {
      td.verify(dispatch('members/removeClanMember', 'removed-membership-id', { root: true }))
    })
  })
})
