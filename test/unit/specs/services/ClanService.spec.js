describe('ClanService', () => {
  let subject, networkUtil, clanMemberMapper, moment

  beforeEach(() => {
    networkUtil = td.replace('@/utils/network-util')
    clanMemberMapper = td.replace('@/mappers/clan-members-mapper')
    moment = td.replace('moment-timezone')
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

  describe('addNoteForMember', () => {
    beforeEach(() => {
      const body = {
        membershipId: 'membership-id',
        adminMembershipId: 'admin-membership-id',
        adminMembershipType: 'bungienet',
        note: 'the note',
        date: 'the date'
      }
      td.when(moment.utc()).thenReturn('the date')
      td.when(networkUtil.post('/clan/clan-id/members/membership-id/note', body)).thenResolve({ data: 'created-note' })
    })

    it('resolves with the created note', done => {
      const note = {
        membershipId: 'membership-id',
        adminMembershipId: 'admin-membership-id',
        adminMembershipType: 'bungienet',
        note: 'the note'
      }
      subject.addNoteForMember('clan-id', note).then(createdNote => {
        expect(createdNote).toEqual('created-note')
        done()
      })
    })
  })

  describe('getNotesForMember', () => {
    beforeEach(() => {
      td.when(networkUtil.get('/clan/clan-id/members/membership-id/note')).thenResolve({ data: 'the notes' })
    })

    it('resolves with the notes for the member', async() => {
      const actual = await subject.getNotesForMember('clan-id', 'membership-id')
      expect(actual).toEqual('the notes')
    })
  })
})
