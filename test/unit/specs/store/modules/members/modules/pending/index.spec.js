import subject from '@/store/modules/members/modules/pending'

describe('pending members module', () => {
  test('default state', () => {
    expect(subject.namespaced).toBe(true)
    expect(subject.state.members).toBeUndefined()
    expect(subject.state.isLoadingPendingMembers).toBe(false)
    expect(subject.state.didLoadPendingMembers).toBe(false)
    expect(subject.state.pendingMembersLoadError).toBe(false)
    expect(subject.getters).toBeDefined()
    expect(subject.actions).toBeDefined()
    expect(subject.mutations).toBeDefined()
  })

  describe('getters', () => {
    let state

    beforeEach(() => {
      state = {
        members: [1, 2],
        isLoadingPendingMembers: false,
        didLoadPendingMembers: false,
        pendingMembersLoadError: false
      }
    })

    test('pendingMembers', () => {
      const actual = subject.getters.pendingMembers(state)
      expect(actual).toEqual([1, 2])
    })

    test('isLoadingPendingMembers', () => {
      const actual = subject.getters.isLoadingPendingMembers(state)
      expect(actual).toBe(false)
    })

    test('didLoadPendingMembers', () => {
      const actual = subject.getters.didLoadPendingMembers(state)
      expect(actual).toBe(false)
    })

    test('pendingMembersLoadError', () => {
      const actual = subject.getters.pendingMembersLoadError(state)
      expect(actual).toBe(false)
    })
  })
})
