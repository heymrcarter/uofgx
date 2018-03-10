import * as actions from './actions'
import * as mutations from './mutations'

export default {
  namespaced: true,
  state: {
    members: undefined
  },
  getters: {
    pendingMembers: state => state.members
  },
  actions,
  mutations
}
