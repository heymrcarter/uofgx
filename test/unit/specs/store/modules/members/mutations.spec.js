import * as subject from '@/store/modules/members/mutations'

describe('members mutations', () => {
  describe('UPDATE_MEMBER_LEVEL', () => {
    let state

    beforeEach(() => {
      state = {
        list: [
          {
            xboxMembershipId: 'membership-id-to-update',
            memberType: 2
          },
          {
            xboxMembershipId: 'other-membership-id',
            memberType: 1
          }
        ]
      }

      subject.UPDATE_MEMBER_LEVEL(state, { membershipId: 'membership-id-to-update', memberLevel: 3 })
    })

    it('updates the members memberType', () => {
      expect(state.list[0].memberType).toEqual(3)
      expect(state.list[1].memberType).toEqual(1)
    })
  })

  describe('START_LOADING_BANNED_MEMBERS', () => {
    let state

    beforeEach(() => {
      state = {
        isLoadingBannedMembers: false,
        didLoadBannedMembers: true
      }

      subject.START_LOADING_BANNED_MEMBERS(state)
    })

    it('flips isLoadingBannedMembers to true', () => {
      expect(state.isLoadingBannedMembers).toBe(true)
    })

    it('flips didLoadBannedMembers to false', () => {
      expect(state.didLoadBannedMembers).toBe(false)
    })
  })

  describe('FINISH_LOADING_BANNED_MEMBERS', () => {
    let state

    beforeEach(() => {
      state = {
        isLoadingBannedMembers: true,
        didLoadBannedMembers: false
      }

      subject.FINISH_LOADING_BANNED_MEMBERS(state)
    })

    it('flips isLoadingBannedMembers to false', () => {
      expect(state.isLoadingBannedMembers).toBe(false)
    })

    it('flips didLoadBannedMembers to true', () => {
      expect(state.didLoadBannedMembers).toBe(true)
    })
  })

  describe('CLEAR_BANNED_MEMBERS_LOAD_ERROR', () => {
    let state

    beforeEach(() => {
      state = {
        bannedMembersLoadError: true
      }

      subject.CLEAR_BANNED_MEMBERS_LOAD_ERROR(state)
    })

    it('flips the state to false', () => {
      expect(state.bannedMembersLoadError).toBe(false)
    })
  })

  describe('SET_BANNED_MEMBERS_LOAD_ERROR', () => {
    let state

    beforeEach(() => {
      state = {
        bannedMembersLoadError: false
      }

      subject.SET_BANNED_MEMBERS_LOAD_ERROR(state)
    })

    it('flips the state to true', () => {
      expect(state.bannedMembersLoadError).toBe(true)
    })
  })

  describe('RELOAD_BANNED_MEMBERS', () => {
    let state

    beforeEach(() => {
      state = {
        didLoadBannedMembers: true
      }

      subject.RELOAD_BANNED_MEMBERS(state)
    })

    it('flips didLoadBannedMembers to false', () => {
      expect(state.didLoadBannedMembers).toBe(false)
    })
  })

  describe('SET_BANNED_MEMBERS', () => {
    let state

    beforeEach(() => {
      state = {
        bannedMembers: undefined
      }

      subject.SET_BANNED_MEMBERS(state, 'banned-members')
    })

    it('sets the banned members', () => {
      expect(state.bannedMembers).toEqual('banned-members')
    })
  })
})
