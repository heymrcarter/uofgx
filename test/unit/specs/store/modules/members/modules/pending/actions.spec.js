const td = global.td

describe('pending members actions', () => {
  let clanService, subject, commit, rootState, getters

  beforeEach(() => {
    clanService = td.replace('@/services/ClanService')
    subject = require('@/store/modules/members/modules/pending/actions')
    rootState = {
      session: {
        accessToken: 'the-access-token'
      }
    }
    commit = jest.fn()
    getters = {
      clanId: 'clan-id'
    }
  })

  describe('getPendingMembers', () => {
    beforeEach(() => {
      td.when(clanService.getPendingMembers('clan-id', 'the-access-token')).thenResolve({
        results: 'the-pending-members'
      })
    })

    it('saves the pending member results to the store', done => {
      subject.getPendingMembers({ commit, rootState, getters }).then(() => {
        expect(commit).toHaveBeenCalledWith('SET_PENDING_MEMBERS', 'the-pending-members')
        done()
      })
    })
  })

  describe('approvePendingMemberships', () => {
    describe('when clanService resolves', () => {
      let membershipIds

      beforeEach(() => {
        membershipIds = [1, 2, 3, 4]
        td.when(clanService.approveMembershipRequest('clan-id', membershipIds, 'the-access-token')).thenResolve()
      })

      it('approves the membership request for the given membership ids', done => {
        subject.approvePendingMemberships({ commit, getters, rootState }, membershipIds).then(() => {
          expect(commit).toHaveBeenCalledWith('APPROVE_MEMBERSHIPS', membershipIds)
          done()
        })
      })
    })

    describe('when clanService rejects', () => {
      let membershipIds

      beforeEach(() => {
        membershipIds = [1, 2, 3, 4]
        td.when(clanService.denyMembershipRequest('clan-id', membershipIds, 'the-access-token')).thenReject(new Error('Oh no'))
      })

      it('bubbles up the error', done => {
        subject.denyPendingMemberships({ commit, getters, rootState }, membershipIds).catch(error => {
          expect(commit).not.toHaveBeenCalled()
          expect(error.message).toEqual('Oh no')
          done()
        })
      })
    })
  })

  describe('denyPendingMemberships', () => {
    describe('when clanService resolves', () => {
      let membershipIds

      beforeEach(() => {
        membershipIds = [1, 2, 3, 4]
        td.when(clanService.denyMembershipRequest('clan-id', membershipIds, 'the-access-token')).thenResolve()
      })

      it('approves the membership request for the given membership ids', done => {
        subject.denyPendingMemberships({ commit, getters, rootState }, membershipIds).then(() => {
          expect(commit).toHaveBeenCalledWith('DENY_MEMBERSHIPS', membershipIds)
          done()
        })
      })
    })

    describe('when clanService rejects', () => {
      let membershipIds

      beforeEach(() => {
        membershipIds = [1, 2, 3, 4]
        td.when(clanService.denyMembershipRequest('clan-id', membershipIds, 'the-access-token')).thenReject(new Error('Oh no'))
      })

      it('bubbles up the error', done => {
        subject.denyPendingMemberships({ commit, getters, rootState }, membershipIds).catch(error => {
          expect(commit).not.toHaveBeenCalled()
          expect(error.message).toEqual('Oh no')
          done()
        })
      })
    })
  })
})
