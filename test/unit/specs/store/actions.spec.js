describe('root actions', () => {
  let commit, subject, clanService

  beforeEach(() => {
    jest.useFakeTimers()
    commit = td.function()
    clanService = td.replace('@/services/ClanService')
    subject = require('@/store/actions')
  })

  describe('setClanId', () => {
    beforeEach(() => {
      subject.setClanId({ commit }, 'clanId')
    })

    it('updates the clanId state', () => {
      td.verify(commit('SET_CLAN_ID', 'clanId'))
    })
  })

  describe('setClanName', () => {
    beforeEach(() => {
      subject.setClanName({ commit }, 'name')
    })

    it('updates the clanName state', () => {
      td.verify(commit('SET_CLAN_NAME', 'name'))
    })
  })

  describe('setMembershipType', () => {
    beforeEach(() => {
      subject.setMembershipType({ commit }, 'membership-type')
    })

    it('saves the membership type', () => {
      td.verify(commit('SET_MEMBERSHIP_TYPE', 'membership-type'))
    })
  })

  describe('getWeeklyMilestones', () => {
    describe('when everything goes right', () => {
      beforeEach(async() => {
        td.when(clanService.getWeeklyMilestones('clan-id')).thenResolve('the-milestones')

        const rootState = {
          clanId: 'clan-id'
        }
        await subject.getWeeklyMilestones({ commit, rootState })
      })

      it('starts loading the milestones', () => {
        td.verify(commit('START_LOADING_MILESTONES'))
      })

      it('finishes loading the milestones', () => {
        td.verify(commit('FINISH_LOADING_MILESTONES'))
      })

      it('commits the milestones', () => {
        td.verify(commit('SET_CLAN_MILESTONES', 'the-milestones'))
      })

      it('reloads the milestones after 15 minutes', () => {
        td.verify(commit('RELOAD_WEEKLY_MILESTONES'), { times: 0 })
        jest.runAllTimers()
        td.verify(commit('RELOAD_WEEKLY_MILESTONES'))
      })
    })

    describe('when an error occurs', () => {
      let actual

      beforeEach(async() => {
        td.when(clanService.getWeeklyMilestones('clan-id')).thenReject(new Error('the error'))

        const rootState = {
          clanId: 'clan-id'
        }

        try {
          await subject.getWeeklyMilestones({ commit, rootState })
        } catch (error) {
          actual = error
        }
      })

      it('starts loading milestones', () => {
        td.verify(commit('START_LOADING_MILESTONES'))
      })

      it('finishes loading the milestones', () => {
        td.verify(commit('FINISH_LOADING_MILESTONES'))
      })

      it('reports the error', () => {
        td.verify(commit('MILESTONE_LOAD_ERROR'))
      })

      it('returns the error', () => {
        expect(actual.message).toEqual('the error')
      })
    })
  })
})
