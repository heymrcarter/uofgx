import * as subject from '@/store/mutations'

describe('root mutations', () => {
  describe('SET_CLAN_ID', () => {
    let state

    beforeEach(() => {
      state = {
        clanId: undefined
      }
    })

    it('sets clanId to the given value', () => {
      subject.SET_CLAN_ID(state, 'clanId')
      expect(state.clanId).toEqual('clanId')
    })
  })

  describe('SET_CLAN_NAME', () => {
    let state

    beforeEach(() => {
      state = {
        clanName: undefined
      }
    })

    it('sets clanId to the given value', () => {
      subject.SET_CLAN_NAME(state, 'name')
      expect(state.clanName).toEqual('name')
    })
  })

  describe('SET_MEMBERSHIP_TYPE', () => {
    let state

    beforeEach(() => {
      state = { membershipType: undefined }
      subject.SET_MEMBERSHIP_TYPE(state, 'membership-type')
    })

    it('updates membershipType', () => {
      expect(state.membershipType).toEqual('membership-type')
    })
  })

  describe('SET_CLAN_MILESTONES', () => {
    let state

    beforeEach(() => {
      state = {
        weeklyMilestones: undefined
      }

      subject.SET_CLAN_MILESTONES(state, 'the-milestones')
    })

    it('updates the weeklyMilestones state', () => {
      expect(state.weeklyMilestones).toEqual('the-milestones')
    })
  })

  describe('START_LOADING_MILESTONES', () => {
    let state

    beforeEach(() => {
      state = {
        isLoadingWeeklyMilestones: false,
        didLoadWeeklyMilestones: undefined,
        weeklyMilestonesLoadError: undefined
      }

      subject.START_LOADING_MILESTONES(state)
    })

    it('sets isLoadingWeeklyMilestones to true', () => {
      expect(state.isLoadingWeeklyMilestones).toEqual(true)
    })

    it('sets didLoadWeeklyMilestones to false', () => {
      expect(state.didLoadWeeklyMilestones).toEqual(false)
    })

    it('sets weeklyMilestonesLoadError to false', () => {
      expect(state.weeklyMilestonesLoadError).toEqual(false)
    })
  })

  describe('FINISH_LOADING_MILESTONES', () => {
    let state

    beforeEach(() => {
      state = {
        isLoadingWeeklyMilestones: true,
        didLoadWeeklyMilestones: false
      }

      subject.FINISH_LOADING_MILESTONES(state)
    })

    it('sets isLoadingWeeklyMilestones to false', () => {
      expect(state.isLoadingWeeklyMilestones).toEqual(false)
    })

    it('sets didLoadWeeklyMilestones to true', () => {
      expect(state.didLoadWeeklyMilestones).toEqual(true)
    })
  })

  describe('MILESTONE_LOAD_ERROR', () => {
    let state

    beforeEach(() => {
      state = {
        weeklyMilestonesLoadError: false
      }
      subject.MILESTONE_LOAD_ERROR(state)
    })

    it('sets weeklyMilestonesLoadError to true', () => {
      expect(state.weeklyMilestonesLoadError).toEqual(true)
    })
  })

  describe('RELOAD_WEEKLY_MILESTONES', () => {
    let state

    beforeEach(() => {
      state = {
        isLoadingWeeklyMilestones: false,
        didLoadWeeklyMilestones: true
      }

      subject.RELOAD_WEEKLY_MILESTONES(state)
    })

    it('sets isLoadingWeeklyMilestones to true', () => {
      expect(state.isLoadingWeeklyMilestones).toEqual(true)
    })

    it('sets didLoadWeeklyMilestones to false', () => {
      expect(state.didLoadWeeklyMilestones).toEqual(false)
    })
  })
})
