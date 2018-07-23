import * as subject from '@/store/modules/activity/mutations'

describe('activity mutations', () => {
  describe('SET_ACTIVITY_OVERVIEW', () => {
    let state

    beforeEach(() => {
      state = {
        overview: undefined
      }

      subject.SET_ACTIVITY_OVERVIEW(state, 'activity-overview')
    })

    it('saves the activity overview', () => {
      expect(state.overview).toEqual('activity-overview')
    })
  })
})
