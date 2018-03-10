import * as actions from './actions'
import * as mutations from './mutations'

export default {
  state: {
    removalHistory: undefined
  },
  getters: {
    removalHistory: state => state.removalHistory
  },
  actions,
  mutations
}
