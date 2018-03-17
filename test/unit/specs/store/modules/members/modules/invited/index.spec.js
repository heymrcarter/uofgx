import subject from '@/store/modules/members/modules/invited'

describe('invited members module', () => {
  test('default state', () => {
    expect(subject.namespaced).toBe(true)
    expect(subject.state.members).toBeUndefined()
    expect(subject.state.isLoadingInvitedMembers).toBe(false)
    expect(subject.state.didLoadInvitedMembers).toBe(false)
    expect(subject.state.invitedMembersLoadError).toBe(false)
    expect(subject.getters).toBeDefined()
    expect(subject.actions).toBeDefined()
    expect(subject.mutations).toBeDefined()
  })

  describe('getters', () => {
    let state

    beforeEach(() => {
      state = {
        members: [1, 2],
        isLoadingInvitedMembers: false,
        didLoadInvitedMembers: false,
        invitedMembersLoadError: false
      }
    })

    test('invitedMembers', () => {
      const actual = subject.getters.invitedMembers(state)
      expect(actual).toEqual([1, 2])
    })

    test('isLoadingInvitedMembers', () => {
      const actual = subject.getters.isLoadingInvitedMembers(state)
      expect(actual).toBe(false)
    })

    test('didLoadInvitedMembers', () => {
      const actual = subject.getters.didLoadInvitedMembers(state)
      expect(actual).toBe(false)
    })

    test('invitedMembersLoadError', () => {
      const actual = subject.getters.invitedMembersLoadError(state)
      expect(actual).toBe(false)
    })
  })
})
