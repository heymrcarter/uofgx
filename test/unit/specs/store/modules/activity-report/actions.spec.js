describe('activity report actions', () => {
  let subject, clanService, commit

  beforeEach(() => {
    jest.useFakeTimers()
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

    it('starts the loading process', () => {
      td.verify(commit('START_LOADING'))
      td.verify(commit('RESET_LOAD_ERROR'))
    })

    it('saves the fetched report', () => {
      td.verify(commit('SET_ACTIVITY_REPORT', 'the-report'))
    })

    it('stops loading', () => {
      td.verify(commit('FINISH_LOADING'))
    })

    it('reloads after 15 minutes', () => {
      jest.runAllTimers()
      td.verify(commit('RELOAD'))
    })
  })

  describe('removeMemberFromReport', () => {
    beforeEach(() => {
      subject.removeMemberFromReport({ commit }, 'membership-id')
    })

    it('removes the member from the report', () => {
      td.verify(commit('REMOVE_MEMBER', 'membership-id'))
    })
  })
})
