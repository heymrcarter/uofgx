import * as subject from '@/store/modules/members/mutations'

describe('members mutations', () => {
  describe('UPDATE_MEMBER_LEVEL', () => {
    let state

    beforeEach(() => {
      state = {
        list: [
          {
            xboxMembershipId: 'membership-id-to-update',
            memberType: 2
          },
          {
            xboxMembershipId: 'other-membership-id',
            memberType: 1
          }
        ]
      }

      subject.UPDATE_MEMBER_LEVEL(state, { membershipId: 'membership-id-to-update', memberLevel: 3 })
    })

    it('updates the members memberType', () => {
      expect(state.list[0].memberType).toEqual(3)
      expect(state.list[1].memberType).toEqual(1)
    })
  })
})
