import * as subject from '@/store/modules/members/modules/pending/mutations'

describe('pending members mutations', () => {
  describe('SET_PENDING_MEMBERS', () => {
    let state
    beforeEach(() => {
      state = {
        members: undefined
      }

      subject.SET_PENDING_MEMBERS(state, 'the-pending-members')
    })

    it('sets the members state', () => {
      expect(state.members).toEqual('the-pending-members')
    })
  })

  describe('APPROVE_MEMBERSHIPS', () => {
    let state
    beforeEach(() => {
      state = {
        members: [
          {
            destinyUserInfo: { membershipId: 1 },
            resolveState: 0
          },
          {
            destinyUserInfo: { membershipId: 2 },
            resolveState: 0
          }
        ]
      }

      subject.APPROVE_MEMBERSHIPS(state, [1, 2])
    })

    it('updates resolveState for the specified membershipIds', () => {
      expect(state.members[0].resolveState).toEqual(1)
      expect(state.members[1].resolveState).toEqual(1)
    })

    describe('with an unknown membershipId', () => {
      beforeEach(() => {
        state = {
          members: [
            {
              destinyUserInfo: { membershipId: 1 },
              resolveState: 0
            },
            {
              destinyUserInfo: { membershipId: 2 },
              resolveState: 0
            }
          ]
        }

        subject.DENY_MEMBERSHIPS(state, [3])
      })

      it('does not update the state', () => {
        expect(state).toEqual({
          members: [
            {
              destinyUserInfo: { membershipId: 1 },
              resolveState: 0
            },
            {
              destinyUserInfo: { membershipId: 2 },
              resolveState: 0
            }
          ]
        })
      })
    })
  })

  describe('DENY_MEMBERSHIPS', () => {
    let state
    beforeEach(() => {
      state = {
        members: [
          {
            destinyUserInfo: { membershipId: 1 },
            resolveState: 0
          },
          {
            destinyUserInfo: { membershipId: 2 },
            resolveState: 0
          }
        ]
      }

      subject.DENY_MEMBERSHIPS(state, [1, 2])
    })

    it('updates resolveState for the specified membershipIds', () => {
      expect(state.members[0].resolveState).toEqual(2)
      expect(state.members[1].resolveState).toEqual(2)
    })

    describe('with an unknown membershipId', () => {
      beforeEach(() => {
        state = {
          members: [
            {
              destinyUserInfo: { membershipId: 1 },
              resolveState: 0
            },
            {
              destinyUserInfo: { membershipId: 2 },
              resolveState: 0
            }
          ]
        }

        subject.DENY_MEMBERSHIPS(state, [3])
      })

      it('does not update the state', () => {
        expect(state).toEqual({
          members: [
            {
              destinyUserInfo: { membershipId: 1 },
              resolveState: 0
            },
            {
              destinyUserInfo: { membershipId: 2 },
              resolveState: 0
            }
          ]
        })
      })
    })
  })
})
