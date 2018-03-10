import * as actions from './actions'
import * as mutations from './mutations'

export default {
  namespaced: true,
  state: {
    members: undefined
  },
  getters: {
    invitedMembers: state => state.members
  },
  actions,
  mutations
}
