import subject from '@/store/modules/members/modules/pending'

describe('pending members module', () => {
  test('default state', () => {
    expect(subject.namespaced).toBe(true)
    expect(subject.state.members).toBeUndefined()
    expect(subject.getters).toBeDefined()
    expect(subject.actions).toBeDefined()
    expect(subject.mutations).toBeDefined()
  })

  test('getters', () => {
    const state = { members: [1, 2] }
    const actual = subject.getters.pendingMembers(state)
    expect(actual).toEqual([1, 2])
  })
})
