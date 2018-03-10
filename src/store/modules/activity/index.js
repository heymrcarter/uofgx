import * as actions from './actions'
import * as mutations from './mutations'

export default {
  state: {
    details: {}
  },
  getters: {
    activityDetails: state => state.activityDetails
  },
  actions,
  mutations
}
