describe('activity report actions', () => {
  let subject, clanService, commit

  beforeEach(() => {
    commit = td.function()
    clanService = td.replace('@/services/ClanService')
    subject = require('@/store/modules/activity-report/actions')
  })

  describe('getActivityReport', () => {
    beforeEach(done => {
      const rootState = { clanId: 'clan-id' }
      td.when(clanService.getActivityReport('clan-id')).thenResolve('the-report')
      subject.getActivityReport({ commit, rootState }).finally(done)
    })

    it('saves the fetched report', () => {
      td.verify(commit('SET_ACTIVITY_REPORT', 'the-report'))
    })
  })
})
