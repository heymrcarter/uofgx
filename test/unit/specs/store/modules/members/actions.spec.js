describe('member actions', () => {
  let subject, clanService, memberService, commit

  beforeEach(() => {
    jest.useFakeTimers()
    commit = td.function()
    clanService = td.replace('@/services/ClanService')
    memberService = td.replace('@/services/MemberService')
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

  describe('removeClanMember', () => {
    beforeEach(() => {
      subject.removeClanMember({ commit }, 'membership-id')
    })

    it('commits the REMOVE_CLAN_MEMBER mutation', () => {
      td.verify(commit('REMOVE_CLAN_MEMBER', 'membership-id'))
    })
  })

  describe('getExpansions', () => {
    describe('when the members expansions have been previously cached', () => {
      let actual

      beforeEach(async() => {
        const state = {
          expansions: {
            'membership-id': 'cached-expansions'
          }
        }

        const rootState = { membershipType: 'membership-type' }

        actual = await subject.getExpansions({ commit, rootState, state }, 'membership-id')
      })

      it('returns the expansions from cache', () => {
        expect(actual).toEqual('cached-expansions')
        td.verify(memberService.getMemberExpansions('membership-type', 'membership-id'), { times: 0 })
      })
    })

    describe('when the members expansions have to be fetched', () => {
      let actual

      beforeEach(async() => {
        const rootState = { membershipType: 'membership-type' }
        const state = { expansions: {} }
        td.when(memberService.getMemberExpansions('membership-type', 'membership-id')).thenResolve('the-expansions')
        actual = await subject.getExpansions({ commit, rootState, state }, 'membership-id')
      })

      it('fetches the expansions and commits the result', () => {
        td.verify(commit('CACHE_MEMBER_EXPANSIONS', { membershipId: 'membership-id', expansions: 'the-expansions' }))
      })

      it('returns the members expansions', () => {
        expect(actual).toEqual('the-expansions')
      })
    })
  })

  describe('editMemberLevel', () => {
    beforeEach(async() => {
      const membershipId = 'membership-id'
      const rootState = {
        clanId: 'clan-id',
        session: {
          accessToken: 'the-access-token'
        },
        membershipType: 'membership-type'
      }
      td.when(clanService.editMemberLevel('the-access-token', 'clan-id', 'membership-type', 'membership-id', 3)).thenResolve()
      await subject.editMemberLevel({ commit, rootState }, { membershipId, newLevel: 3 })
    })

    it('makes a request to edit the member level', () => {
      td.verify(clanService.editMemberLevel('the-access-token', 'clan-id', 'membership-type', 'membership-id', 3))
    })

    it('updates the memberLevel in the store', () => {
      td.verify(commit('UPDATE_MEMBER_LEVEL', { membershipId: 'membership-id', memberLevel: 3 }))
    })
  })
})
