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

  describe('getActivityReport', () => {
    let actual

    beforeEach(async() => {
      td.when(networkUtil.get('/clan/clan-id/activity-report')).thenResolve({ data: 'the-response' })
      actual = await subject.getActivityReport('clan-id')
    })

    it('returns the result', () => {
      expect(actual).toEqual('the-response')
    })
  })

  describe('getPendingMembers', () => {
    let actual

    beforeEach(async() => {
      td.when(networkUtil.get('/clan/clan-id/members/pending', { Authorization: 'Bearer auth-token' })).thenResolve({ data: 'the-response' })
      actual = await subject.getPendingMembers('clan-id', 'auth-token')
    })

    it('returns the result', () => {
      expect(actual).toEqual('the-response')
    })
  })

  describe('getInvitedMembers', () => {
    let actual

    beforeEach(async() => {
      td.when(networkUtil.get('/clan/clan-id/members/invited', { Authorization: 'Bearer auth-token' })).thenResolve({ data: 'the-response' })
      actual = await subject.getInvitedMembers('clan-id', 'auth-token')
    })

    it('returns the response', () => {
      expect(actual).toEqual('the-response')
    })
  })

  describe('approveMembershipRequest', () => {
    let actual

    beforeEach(async() => {
      const expectedBody = {
        memberships: [
          {
            membershipId: 'membership-id',
            membershipType: 1
          }
        ],
        message: ''
      }
      const expectedHeaders = {
        Authorization: 'Bearer auth-token'
      }
      td.when(networkUtil.post('/clan/clan-id/members/pending/approve', expectedBody, expectedHeaders)).thenResolve({ data: 'the-response' })
      actual = await subject.approveMembershipRequest('clan-id', ['membership-id'], 'auth-token')
    })

    it('returns the response', () => {
      expect(actual).toEqual('the-response')
    })
  })

  describe('denyMembershipRequest', () => {
    let actual

    beforeEach(async() => {
      const expectedBody = {
        memberships: [
          {
            membershipId: 'membership-id',
            membershipType: 1
          }
        ],
        message: ''
      }

      const expectedHeaders = {
        Authorization: 'Bearer auth-token'
      }

      td.when(networkUtil.post('/clan/clan-id/members/pending/deny', expectedBody, expectedHeaders)).thenResolve({ data: 'the-response' })
      actual = await subject.denyMembershipRequest('clan-id', ['membership-id'], 'auth-token')
    })

    it('returns the response', () => {
      expect(actual).toEqual('the-response')
    })
  })

  describe('rescindMembershipInvitation', () => {
    let actual

    beforeEach(async() => {
      const expectedHeaders = {
        Authorization: 'Bearer auth-token'
      }
      td.when(networkUtil.post('/clan/clan-id/members/invited/rescind/membership-type/membership-id', null, expectedHeaders)).thenResolve({ data: 'the-response' })

      actual = await subject.rescindMembershipInvitation('clan-id', 'membership-type', 'membership-id', 'auth-token')
    })

    it('returns the response', () => {
      expect(actual).toEqual('the-response')
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

  describe('editMemberLevel', () => {
    let actual

    beforeEach(async() => {
      const expectedBody = {
        membershipType: 'membership-type',
        membershipId: 'membership-id',
        memberType: 3
      }

      const expectedHeaders = {
        Authorization: 'Bearer auth-token'
      }
      td.when(networkUtil.put('/clan/clan-id/members/member-type', expectedBody, expectedHeaders)).thenResolve({ data: 'the-response' })

      actual = await subject.editMemberLevel('auth-token', 'clan-id', 'membership-type', 'membership-id', 3)
    })

    it('returns the response', () => {
      expect(actual).toEqual('the-response')
    })
  })
})
