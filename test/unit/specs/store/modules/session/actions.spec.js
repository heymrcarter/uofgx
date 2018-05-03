describe('session actions', () => {
  let subject, memberService, commit, dispatch
  beforeEach(() => {
    jest.useFakeTimers()
    commit = td.function()
    dispatch = td.function()
    memberService = td.replace('@/services/MemberService')
    subject = require('@/store/modules/session/actions')
  })

  describe('getUserGroups', () => {
    describe('when the user is in one group', () => {
      beforeEach(done => {
        td.when(memberService.getAdminGroups('membership-id')).thenResolve([
          {
            groupId: 'clan-id',
            groupName: 'clan-name',
            platformUserInfo: {
              membershipType: 'membership-type'
            }
          }
        ])
        const session = {
          membership_id: 'membership-id',
          expires_in: 60
        }
        subject.getUserGroups({ dispatch, commit }, session).finally(done)
      })

      it('grants the user access to the application', () => {
        td.verify(commit('GRANT_ACCESS', 'membership-id'))
      })

      it('commits the clan id the member is an admin of', () => {
        td.verify(dispatch('setClanId', 'clan-id', { root: true }))
      })

      it('commits the clan name the member is an admin of', () => {
        td.verify(dispatch('setClanName', 'clan-name', { root: true }))
      })

      it('saves the membership type', () => {
        td.verify(dispatch('setMembershipType', 'membership-type', { root: true }))
      })

      it('starts a timer for the session', () => {
        td.verify(commit('SESSION_EXPIRED'), { times: 0 })
        jest.runAllTimers()
        td.verify(commit('SESSION_EXPIRED'), { times: 1 })
      })
    })
  })
})
