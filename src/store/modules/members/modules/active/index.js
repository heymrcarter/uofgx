import * as actions from './actions'
import * as mutations from './mutations'

export default {
  namespaced: true,
  state: {
    member: undefined,
    characterActivity: undefined
  },
  getters: {
    activeMember: state => state.member,
    activeMemberCharacterActivity: state => state.characterActivity
  },
  actions,
  mutations
}
