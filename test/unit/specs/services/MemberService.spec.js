describe('MemberService', () => {
  let subject, get, characterMapper

  beforeEach(() => {
    const networkUtil = td.replace('@/utils/network-util')
    get = networkUtil.get
    characterMapper = td.replace('@/mappers/character-mapper')
    subject = require('@/services/MemberService')
  })

  describe('getMemberCharacters', () => {
    let actual

    beforeEach(async() => {
      td.when(get('/member/membership-type/membership-id/characters')).thenResolve({ data: 'member-characters' })
      td.when(characterMapper.mapCharacters('member-characters')).thenReturn('mapped-characters')

      actual = await subject.getMemberCharacters('membership-type', 'membership-id')
    })

    it('fetches characters for a member and returns them', () => {
      expect(actual).toEqual('mapped-characters')
    })
  })

  describe('getActivityForMemberCharacter', () => {
    let actual

    beforeEach(async() => {
      td.when(get('/member/membership-type/membership-id/activity/character-id')).thenResolve({ data: 'character-activity' })
      actual = await subject.getActivityForMemberCharacter('membership-type', 'membership-id', 'character-id')
    })

    it('fetches activity for a members character', () => {
      expect(actual).toEqual('character-activity')
    })
  })

  describe('getRecentActivityBreakdownForMemberCharacter', () => {
    let actual

    beforeEach(async() => {
      td.when(get('/member/membership-type/membership-id/activity/recent/character-id/activity-breakdown')).thenResolve({ data: 'activity-breakdown' })

      actual = await subject.getRecentActivityBreakdownForMemberCharacter('membership-type', 'membership-id', 'character-id')
    })

    it('fetches the member character activity breakdown', () => {
      expect(actual).toEqual('activity-breakdown')
    })
  })

  describe('getRecentActivityByDateForMemberCharacter', () => {
    let actual

    beforeEach(async() => {
      td.when(get('/member/membership-type/membership-id/activity/recent/character-id/activity-by-date')).thenResolve({ data: 'activity-by-date' })

      actual = await subject.getRecentActivityByDateForMemberCharacter('membership-type', 'membership-id', 'character-id')
    })

    it('fetches activity by date and returns it', () => {
      expect(actual).toEqual('activity-by-date')
    })
  })

  describe('getAdminGroups', () => {
    beforeEach(() => {
      td.when(get('/member/254/membership-id/admin-groups')).thenResolve({ data: 'the-groups' })
    })

    it('fetches the groups the member is an admin of', done => {
      subject.getAdminGroups('membership-id').then(groups => {
        expect(groups).toEqual('the-groups')
        done()
      })
    })
  })

  describe('getActivityOverview', () => {
    let actual

    beforeEach(async() => {
      td.when(get(`/member/membership-type/membership-id/activity/overview`)).thenResolve({ data: 'the-activity-overview' })

      actual = await subject.getActivityOverview('membership-type', 'membership-id')
    })

    it('returns fetches the activity overview and returns it', () => {
      expect(actual).toEqual('the-activity-overview')
    })
  })
})
