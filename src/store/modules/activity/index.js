import * as actions from './actions'
import * as mutations from './mutations'

export default {
  state: {
    details: {},
    overview: undefined
  },
  getters: {
    activityDetails: state => state.activityDetails,
    activityOverview: state => state.overview
  },
  actions,
  mutations
}
