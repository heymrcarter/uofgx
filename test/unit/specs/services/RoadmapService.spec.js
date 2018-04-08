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
})
