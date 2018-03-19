describe('member actions', () => {
  let subject, clanService, commit

  beforeEach(() => {
    jest.useFakeTimers()
    commit = td.function()
    clanService = td.replace('@/services/ClanService')
    subject = require('@/store/modules/members/actions')
  })

  describe('getClanMembers', () => {
    describe('when clan service resolves', () => {
      beforeEach(done => {
        const rootState = {
          clanId: 'clan-id'
        }
        td.when(clanService.getMembers('clan-id')).thenResolve('the-members')
        subject.getClanMembers({ commit, rootState }).finally(done)
      })

      it('starts loading members', () => {
        td.verify(commit('START_LOADING_MEMBERS'))
      })

      it('clears load errors', () => {
        td.verify(commit('CLEAR_LOAD_ERROR'))
      })

      it('saves the fetched roster', () => {
        td.verify(commit('SET_CLAN_MEMBERS', 'the-members'))
      })

      it('finished loading members', () => {
        td.verify(commit('FINISH_LOADING_MEMBERS'))
      })

      it('starts a timer to refetch members', () => {
        td.verify(commit('RELOAD_MEMBERS'), { times: 0 })
        jest.runAllTimers()
        td.verify(commit('RELOAD_MEMBERS'))
      })
    })

    describe('when clan service rejects', () => {
      let rootState
      beforeEach(() => {
        rootState = {
          clanId: 'clan-id'
        }
        td.when(clanService.getMembers('clan-id')).thenReject(new Error('Oh no'))
      })

      it('handles the error', done => {
        subject.getClanMembers({ commit, rootState }, 'clan-id').catch(error => {
          td.verify(commit('FINISH_LOADING_MEMBERS'))
          td.verify(commit('SET_LOAD_ERROR'))
          expect(error.message).toEqual('Oh no')
          done()
        })
      })
    })
  })
})
