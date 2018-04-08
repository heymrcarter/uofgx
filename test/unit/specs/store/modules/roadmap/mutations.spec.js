describe('roadmap mutations', () => {
  let subject
  beforeEach(() => {
    subject = require('@/store/modules/roadmap/mutations')
  })

  describe('SET_ROADMAP', () => {
    it('sets the roadmap state', () => {
      const state = { roadmap: undefined }
      subject.SET_ROADMAP(state, 'roadmap')
      expect(state.roadmap).toEqual('roadmap')
    })
  })
})
