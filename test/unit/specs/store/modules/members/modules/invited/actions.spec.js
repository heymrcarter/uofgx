const td = global.td

describe('invited members actions', () => {
  let clanService, subject, commit, rootState

  beforeEach(() => {
    jest.useFakeTimers()
    clanService = td.replace('@/services/ClanService')
    subject = require('@/store/modules/members/modules/invited/actions')
    rootState = {
      session: {
        accessToken: 'the-access-token'
      },
      clanId: 'clan-id',
      membershipType: 'membership-type'
    }
    commit = jest.fn()
  })

  describe('getInvitedMembers', () => {
    describe('when clanService resolves', () => {
      beforeEach(done => {
        td.when(clanService.getInvitedMembers('clan-id', 'the-access-token')).thenResolve({
          results: 'the-invited-members'
        })

        subject.getInvitedMembers({ commit, rootState }).finally(done)
      })

      it('starts loading invited members', () => {
        expect(commit).toHaveBeenCalledWith('START_LOADING')
      })

      it('resets invited members error state', () => {
        expect(commit).toHaveBeenCalledWith('RESET_LOAD_ERROR')
      })

      it('finishes loading invited members', () => {
        expect(commit).toBeCalledWith('FINISH_LOADING')
      })

      it('saves the loaded invited members', () => {
        expect(commit).toBeCalledWith('SET_INVITED_MEMBERS', 'the-invited-members')
      })

      it('reloads invited members after 15 minutes', () => {
        expect(commit).not.toBeCalledWith('RELOAD_INVITED_MEMBERS')
        jest.runAllTimers()
        expect(commit).toBeCalledWith('RELOAD_INVITED_MEMBERS')
      })
    })

    describe('when clanService rejects', () => {
      beforeEach(done => {
        td.when(clanService.getInvitedMembers('clan-id', 'the-access-token')).thenReject(new Error('Oh no'))

        subject
          .getInvitedMembers({ commit, rootState })
          .catch(error => {
            expect(error.message).toEqual('Oh no')
          })
          .finally(done)
      })

      it('starts loading invited members', () => {
        expect(commit).toHaveBeenCalledWith('START_LOADING')
      })

      it('resets invited members error state', () => {
        expect(commit).toHaveBeenCalledWith('RESET_LOAD_ERROR')
      })

      it('finishes loading invited members', () => {
        expect(commit).toBeCalledWith('FINISH_LOADING')
      })

      it('sets the load error state', () => {
        expect(commit).toBeCalledWith('LOAD_ERROR')
      })
    })
  })

  describe('rescindMembershipInvitation', () => {
    describe('when clanService resolves', () => {
      beforeEach(async() => {
        td.when(clanService.rescindMembershipInvitation('clan-id', 'membership-type', 'membershipId', 'the-access-token')).thenResolve()

        await subject.rescindMembershipInvitation({ commit, rootState }, 'membershipId')
      })

      it('rescnds the invitation', () => {
        expect(commit).toBeCalledWith('RESCIND_INVITATION', 'membershipId')
      })
    })

    describe('when clanService rejects', () => {
      beforeEach(() => {
        td.when(clanService.rescindMembershipInvitation('clan-id', 'membership-type', 'membershipId', 'the-access-token')).thenReject(new Error('Oh no'))
      })

      it('rescnds the invitation', async() => {
        try {
          await subject.rescindMembershipInvitation({ commit, rootState }, 'membershipId')
        } catch (error) {
          expect(error.message).toEqual('Oh no')
        }
      })
    })
  })
})
