const td = global.td

describe('pending members actions', () => {
  let clanService, subject, commit, rootState, rootGetters

  beforeEach(() => {
    jest.useFakeTimers()
    clanService = td.replace('@/services/ClanService')
    subject = require('@/store/modules/members/modules/pending/actions')
    rootState = {
      session: {
        accessToken: 'the-access-token'
      }
    }
    commit = jest.fn()
    rootGetters = {
      clanId: 'clan-id'
    }
  })

  describe('getPendingMembers', () => {
    describe('when clanService resolves', () => {
      beforeEach(done => {
        td.when(clanService.getPendingMembers('clan-id', 'the-access-token')).thenResolve({
          results: 'the-pending-members'
        })

        subject.getPendingMembers({ commit, rootState, rootGetters }).finally(done)
      })

      it('starts loading pending members', () => {
        expect(commit).toHaveBeenCalledWith('START_LOADING')
      })

      it('resets pending members error state', () => {
        expect(commit).toHaveBeenCalledWith('RESET_LOAD_ERROR')
      })

      it('finishes loading pending members', () => {
        expect(commit).toBeCalledWith('FINISH_LOADING')
      })

      it('saves the loaded pending members', () => {
        expect(commit).toBeCalledWith('SET_PENDING_MEMBERS', 'the-pending-members')
      })

      it('reloads pending members after 15 minutes', () => {
        expect(commit).not.toBeCalledWith('RELOAD_PENDING_MEMBERS')
        jest.runAllTimers()
        expect(commit).toBeCalledWith('RELOAD_PENDING_MEMBERS')
      })
    })

    describe('when clanService rejects', () => {
      beforeEach(done => {
        td.when(clanService.getPendingMembers('clan-id', 'the-access-token')).thenReject(new Error('Oh no'))

        subject
          .getPendingMembers({ commit, rootState, rootGetters })
          .catch(error => {
            expect(error.message).toEqual('Oh no')
          })
          .finally(done)
      })

      it('starts loading pending members', () => {
        expect(commit).toHaveBeenCalledWith('START_LOADING')
      })

      it('resets pending members error state', () => {
        expect(commit).toHaveBeenCalledWith('RESET_LOAD_ERROR')
      })

      it('finishes loading pending members', () => {
        expect(commit).toBeCalledWith('FINISH_LOADING')
      })

      it('sets the load error state', () => {
        expect(commit).toBeCalledWith('LOAD_ERROR')
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
        subject.approvePendingMemberships({ commit, rootGetters, rootState }, membershipIds).then(() => {
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
        subject.denyPendingMemberships({ commit, rootGetters, rootState }, membershipIds).catch(error => {
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
        subject.denyPendingMemberships({ commit, rootGetters, rootState }, membershipIds).then(() => {
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
        subject.denyPendingMemberships({ commit, rootGetters, rootState }, membershipIds).catch(error => {
          expect(commit).not.toHaveBeenCalled()
          expect(error.message).toEqual('Oh no')
          done()
        })
      })
    })
  })
})
