describe('roadmap module', () => {
  let subject

  beforeEach(() => {
    subject = require('@/store/modules/roadmap').default
  })

  it('defaults roadmap state', () => {
    expect(subject.state.roadmap).toBeUndefined()
  })
})
