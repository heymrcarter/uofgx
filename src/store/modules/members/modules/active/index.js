import * as actions from './actions'
import * as mutations from './mutations'

export default {
  namespaced: true,
  state: {
    membershipId: undefined,
    characters: undefined,
    gamertag: undefined,
    characterActivity: undefined
  },
  getters: {
    activeMember: state => {
      return {
        membershipId: state.membershipId,
        characters: state.characters,
        gamertag: state.gamertag
      }
    },
    activeMemberCharacterActivity: state => state.characterActivity
  },
  actions,
  mutations
}
