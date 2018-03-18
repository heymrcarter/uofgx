describe('MemberService', () => {
  let subject, get

  beforeEach(() => {
    const networkUtil = td.replace('@/utils/network-util')
    get = networkUtil.get
    subject = require('@/services/MemberService')
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
})
