import * as subject from '@/store/actions'

describe('root actions', () => {
  let commit

  beforeEach(() => {
    commit = td.function()
  })

  describe('setClanId', () => {
    beforeEach(() => {
      subject.setClanId({ commit }, 'clanId')
    })

    it('updates the clanId state', () => {
      td.verify(commit('SET_CLAN_ID', 'clanId'))
    })
  })

  describe('setClanName', () => {
    beforeEach(() => {
      subject.setClanName({ commit }, 'name')
    })

    it('updates the clanName state', () => {
      td.verify(commit('SET_CLAN_NAME', 'name'))
    })
  })
})
