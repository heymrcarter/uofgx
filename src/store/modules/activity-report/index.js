import * as actions from './actions'
import * as mutations from './mutations'

export default {
  state: {
    activityReport: undefined,
    isLoadingActivityReport: false,
    didLoadActivityReport: false,
    activityReportLoadError: false
  },
  getters: {
    activityReport: state => state.activityReport,
    isLoadingActivityReport: state => state.isLoadingActivityReport,
    didLoadActivityReport: state => state.didLoadActivityReport,
    activityReportLoadError: state => state.activityReportLoadError
  },
  actions,
  mutations
}
