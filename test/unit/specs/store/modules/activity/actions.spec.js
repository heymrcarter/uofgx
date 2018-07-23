describe('activity actions', () => {
  let subject, memberService, commit

  beforeEach(() => {
    commit = td.function()
    memberService = td.replace('@/services/MemberService')
    subject = require('@/store/modules/activity/actions')
  })

  describe('getActivityOverview', () => {
    beforeEach(async() => {
      td.when(memberService.getActivityOverview('membership-type', 'membership-id')).thenResolve('the-activity-overview')

      const rootState = {
        membershipType: 'membership-type'
      }

      await subject.getActivityOverview({ commit, rootState }, 'membership-id')
    })

    it('fetches the activity overview and commits it', () => {
      td.verify(commit('SET_ACTIVITY_OVERVIEW', 'the-activity-overview'))
    })
  })
})
