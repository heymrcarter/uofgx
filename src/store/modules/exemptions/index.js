import * as actions from './actions'
import * as mutations from './mutations'

export default {
  state: {
    exemptions: undefined
  },
  getters: {
    exemptions: state => state.exemptions
  },
  actions,
  mutations
}
