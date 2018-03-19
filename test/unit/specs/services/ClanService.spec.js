describe('ClanService', () => {
  let subject, networkUtil, clanMemberMapper

  beforeEach(() => {
    networkUtil = td.replace('@/utils/network-util')
    clanMemberMapper = td.replace('@/mappers/clan-members-mapper')
    subject = require('@/services/ClanService')
  })

  describe('getMembers', () => {
    beforeEach(() => {
      td.when(networkUtil.get('/clan/clan-id/members')).thenResolve({ data: 'the-response' })
      td.when(clanMemberMapper.mapResponseToView('the-response')).thenReturn('the-mapped-response')
    })

    it('resolves with the mapped response', done => {
      subject.getMembers('clan-id').then(actual => {
        expect(actual).toEqual('the-mapped-response')
        done()
      })
    })
  })
})
