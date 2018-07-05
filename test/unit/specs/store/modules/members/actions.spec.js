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

  describe('getBannedMembers', () => {
    describe('when successful', () => {
      beforeEach(async() => {
        let rootState = {
          session: {
            accessToken: 'access-token'
          },
          clanId: 'clan-id'
        }

        td.when(clanService.getBannedMembers('clan-id', 'access-token')).thenResolve('banned-members')

        await subject.getBannedMembers({ commit, rootState })
      })

      it('starts the loading process', () => {
        td.verify(commit('START_LOADING_BANNED_MEMBERS'))
      })

      it('clears any previous errors', () => {
        td.verify(commit('CLEAR_BANNED_MEMBERS_LOAD_ERROR'))
      })

      it('saves the banned members', () => {
        td.verify(commit('SET_BANNED_MEMBERS', 'banned-members'))
      })

      it('finishes the loading process', () => {
        td.verify(commit('FINISH_LOADING_BANNED_MEMBERS'))
      })

      it('starts a timer to reload banned members', () => {
        td.verify(commit('RELOAD_BANNED_MEMBERS'), { times: 0 })
        jest.runAllTimers()
        td.verify(commit('RELOAD_BANNED_MEMBERS'))
      })
    })

    describe('when unsuccessful', () => {
      let actual

      beforeEach(async() => {
        let rootState = {
          session: {
            accessToken: 'access-token'
          },
          clanId: 'clan-id'
        }

        td.when(clanService.getBannedMembers('clan-id', 'access-token')).thenReject(new Error('oh no!'))

        try {
          await subject.getBannedMembers({ commit, rootState })
        } catch (error) {
          actual = error
        }
      })

      it('finishes the loading process', () => {
        td.verify(commit('FINISH_LOADING_BANNED_MEMBERS'))
      })

      it('saves that an error occurred', () => {
        td.verify(commit('SET_BANNED_MEMBERS_LOAD_ERROR'))
      })

      it('returns the error', () => {
        expect(actual.message).toEqual('oh no!')
      })
    })
  })

  describe('unbanMember', () => {
    let expectedMembership

    beforeEach(async() => {
      expectedMembership = { membershipType: 'membership-type', membershipId: 'membership-id' }
      td.when(clanService.unbanMember('clan-id', 'membership-type', 'membership-id', 'auth-token')).thenResolve(expectedMembership)

      const rootState = {
        session: {
          accessToken: 'auth-token'
        },
        clanId: 'clan-id',
        membershipType: 'membership-type'
      }

      await subject.unbanMember({ commit, rootState }, 'membership-id')
    })

    it('unbans the member and removes the membership from state', () => {
      td.verify(commit('UNBAN_MEMBER', expectedMembership))
    })
  })

  describe('banMember', () => {
    let expectedMembership, dispatch

    beforeEach(async() => {
      dispatch = td.function()
      expectedMembership = { membershipType: 'membership-type', membershipId: 'membership-id' }
      td.when(clanService.banMember('clan-id', 'membership-type', 'membership-id', 'auth-token')).thenResolve(expectedMembership)

      const rootState = {
        session: {
          accessToken: 'auth-token'
        },
        clanId: 'clan-id',
        membershipType: 'membership-type'
      }

      await subject.banMember({ commit, rootState, dispatch }, 'membership-id')
    })

    it('bans the member and adds the membership from state', () => {
      td.verify(commit('BAN_MEMBER', expectedMembership))
    })

    it('reloads the banned members', () => {
      td.verify(dispatch('getBannedMembers'))
    })

    it('reloads the members', () => {
      td.verify(dispatch('getClanMembers'))
    })
  })
})
