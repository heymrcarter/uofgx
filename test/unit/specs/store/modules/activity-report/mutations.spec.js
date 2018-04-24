import * as subject from '@/store/modules/activity-report/mutations'

describe('activity report mutations', () => {
  describe('REMOVE_MEMBER', () => {
    let state

    beforeEach(() => {
      state = {
        activityReport: [
          {
            membershipId: 'membership-id-1'
          },
          {
            membershipId: 'removed-membership-id'
          },
          {
            membershipId: 'membership-id-2'
          }
        ]
      }
    })

    it('removes member profile from the report', () => {
      subject.REMOVE_MEMBER(state, 'removed-membership-id')

      expect(state.activityReport.find(p => p.membershipId === 'removed-membership-id')).toBeUndefined()
      expect(state.activityReport.length).toBe(2)
    })

    it('does nothing if the member is not on the report', () => {
      subject.REMOVE_MEMBER(state, 'not-inactive-membership-id')

      expect(state.activityReport.length).toBe(3)
    })
  })

  describe('START_LOADING', () => {
    let state

    beforeEach(() => {
      state = {
        didLoadActivityReport: false,
        isLoadingActivityReport: false
      }

      subject.START_LOADING(state)
    })

    it('sets didLoadActivityReport to true', () => {
      expect(state.didLoadActivityReport).toBe(false)
      expect(state.isLoadingActivityReport).toBe(true)
    })
  })

  describe('FINISH_LOADING', () => {
    let state

    beforeEach(() => {
      state = {
        didLoadActivityReport: false,
        isLoadingActivityReport: true
      }

      subject.FINISH_LOADING(state)
    })

    it('sets didLoadActivityReport to true', () => {
      expect(state.didLoadActivityReport).toBe(true)
      expect(state.isLoadingActivityReport).toBe(false)
    })
  })

  describe('RESET_LOAD_ERROR', () => {
    let state

    beforeEach(() => {
      state = {
        activityReportLoadError: true
      }

      subject.RESET_LOAD_ERROR(state)
    })

    it('sets didLoadActivityReport to true', () => {
      expect(state.activityReportLoadError).toBe(false)
    })
  })

  describe('LOAD_ERROR', () => {
    let state

    beforeEach(() => {
      state = {
        activityReportLoadError: false
      }

      subject.LOAD_ERROR(state)
    })

    it('sets didLoadActivityReport to true', () => {
      expect(state.activityReportLoadError).toBe(true)
    })
  })

  describe('RELOAD', () => {
    let state

    beforeEach(() => {
      state = {
        didLoadActivityReport: true
      }

      subject.RELOAD(state)
    })

    it('sets didLoadActivityReport to true', () => {
      expect(state.didLoadActivityReport).toBe(false)
    })
  })
})
