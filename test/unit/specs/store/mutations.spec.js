import * as subject from '@/store/mutations'

describe('root mutations', () => {
  describe('SET_CLAN_ID', () => {
    let state

    beforeEach(() => {
      state = {
        clanId: undefined
      }
    })

    it('sets clanId to the given value', () => {
      subject.SET_CLAN_ID(state, 'clanId')
      expect(state.clanId).toEqual('clanId')
    })
  })

  describe('SET_CLAN_NAME', () => {
    let state

    beforeEach(() => {
      state = {
        clanName: undefined
      }
    })

    it('sets clanId to the given value', () => {
      subject.SET_CLAN_NAME(state, 'name')
      expect(state.clanName).toEqual('name')
    })
  })

  describe('SET_MEMBERSHIP_TYPE', () => {
    let state

    beforeEach(() => {
      state = { membershipType: undefined }
      subject.SET_MEMBERSHIP_TYPE(state, 'membership-type')
    })

    it('updates membershipType', () => {
      expect(state.membershipType).toEqual('membership-type')
    })
  })
})
