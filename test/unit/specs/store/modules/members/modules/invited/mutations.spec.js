import * as subject from '@/store/modules/members/modules/invited/mutations'

describe('invited members mutations', () => {
  describe('SET_INVITED_MEMBERS', () => {
    let state
    beforeEach(() => {
      state = {
        members: undefined
      }

      subject.SET_INVITED_MEMBERS(state, 'the-invited-members')
    })

    it('sets the members state', () => {
      expect(state.members).toEqual('the-invited-members')
    })
  })

  describe('RESCIND_INVITATION', () => {
    let state
    beforeEach(() => {
      state = {
        members: [{ destinyUserInfo: { membershipId: 1234 }, resolveState: 0 }]
      }

      subject.RESCIND_INVITATION(state, 1234)
    })

    it('updates the given members resolveState', () => {
      expect(state.members[0].resolveState).toEqual(3)
    })
  })

  describe('START_LOADING', () => {
    let state
    beforeEach(() => {
      state = {
        isLoadingInvitedMembers: false
      }

      subject.START_LOADING(state)
    })

    it('sets isLoadingInvitedMembers state to true', () => {
      expect(state.isLoadingInvitedMembers).toEqual(true)
    })

    it('sets didLoadInvitedMembers state to false', () => {
      expect(state.didLoadInvitedMembers).toEqual(false)
    })
  })

  describe('FINISH_LOADING', () => {
    let state
    beforeEach(() => {
      state = {
        isLoadingInvitedMembers: true
      }

      subject.FINISH_LOADING(state)
    })

    it('sets isLoadingInvitedMembers state to false', () => {
      expect(state.isLoadingInvitedMembers).toBe(false)
    })

    it('sets didLoadInvitedMembers state to true', () => {
      expect(state.didLoadInvitedMembers).toEqual(true)
    })
  })

  describe('RESET_LOAD_ERROR', () => {
    let state
    beforeEach(() => {
      state = {
        invitedMembersLoadError: true
      }

      subject.RESET_LOAD_ERROR(state)
    })

    it('sets invitedMembersLoadError state to false', () => {
      expect(state.invitedMembersLoadError).toBe(false)
    })
  })

  describe('LOAD_ERROR', () => {
    let state
    beforeEach(() => {
      state = {
        invitedMembersLoadError: false
      }

      subject.LOAD_ERROR(state)
    })

    it('sets invitedMembersLoadError state to true', () => {
      expect(state.invitedMembersLoadError).toBe(true)
    })
  })

  describe('RELOAD_INVITED_MEMBERS', () => {
    let state
    beforeEach(() => {
      state = {
        didLoadInvitedMembers: true
      }

      subject.RELOAD_INVITED_MEMBERS(state)
    })

    it('sets didLoadInvitedMembers state to false', () => {
      expect(state.didLoadInvitedMembers).toBe(false)
    })
  })
})
