describe('roadmap actions', () => {
  let subject, roadmapService

  beforeEach(() => {
    roadmapService = td.replace('@/services/RoadmapService')
    subject = require('@/store/modules/roadmap/actions')
  })

  describe('getRoadmap', () => {
    let commit

    beforeEach(async() => {
      commit = td.function()
      td.when(roadmapService.getRoadmap()).thenResolve('roadmap')
      await subject.getRoadmap({ commit })
    })

    it('fetches the roadmap and saves it to the store', () => {
      td.verify(commit('SET_ROADMAP', 'roadmap'))
    })
  })
})
