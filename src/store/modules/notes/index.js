import * as actions from './actions'
import * as mutations from './mutations'

export default {
  namespaced: true,
  state: {
    notes: {}
  },
  actions,
  mutations
}
