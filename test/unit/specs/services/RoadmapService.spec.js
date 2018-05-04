describe('RoadmapService', () => {
  let subject, networkUtil

  beforeEach(() => {
    networkUtil = td.replace('@/utils/network-util')
    subject = require('@/services/RoadmapService')
  })

  describe('getRoadmap', () => {
    let actual

    beforeEach(async() => {
      td.when(networkUtil.get('/roadmap')).thenResolve({ data: 'roadmap' })
      actual = await subject.getRoadmap()
    })

    it('returns the network response', () => {
      expect(actual).toEqual('roadmap')
    })
  })

  describe('submitFeatureRequest', () => {
    beforeEach(async() => {
      td.when(networkUtil.post('/roadmap/suggestion', td.matchers.anything())).thenResolve()
      await subject.submitFeatureRequest('the-feature-request')
    })

    it('sends the feature request', () => {
      td.verify(networkUtil.post('/roadmap/suggestion', 'the-feature-request'))
    })
  })
})
