import * as actions from './actions'
import * as mutations from './mutations'

export default {
  state: {
    activityReport: undefined
  },
  getters: {
    activityReport: state => state.activityReport
  },
  actions,
  mutations
}
