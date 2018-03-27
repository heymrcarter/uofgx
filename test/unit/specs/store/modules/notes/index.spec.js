describe('notes module', () => {
  let subject

  beforeEach(() => {
    subject = require('@/store/modules/notes').default
  })

  it('defaults state', () => {
    expect(subject.state.notes).toEqual({})
  })

  it('has actions', () => {
    expect(subject.actions.addNote).toBeDefined()
  })

  it('has mutations', () => {
    expect(subject.mutations.ADD_NOTE_FOR_MEMBER).toBeDefined()
  })
})
