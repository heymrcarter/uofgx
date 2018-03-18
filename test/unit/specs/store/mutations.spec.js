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
})
