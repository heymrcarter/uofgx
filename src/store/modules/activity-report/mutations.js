export function SET_ACTIVITY_REPORT(state, report) {
  state.activityReport = report
}

export function REMOVE_MEMBER(state, membershipId) {
  const index = state.activityReport.findIndex(p => p.membershipId === membershipId)

  if (index > 0) {
    state.activityReport.splice(index, 1)
  }
}

export function START_LOADING(state) {
  state.didLoadActivityReport = false
  state.isLoadingActivityReport = true
}

export function FINISH_LOADING(state) {
  state.didLoadActivityReport = true
  state.isLoadingActivityReport = false
}

export function LOAD_ERROR(state) {
  state.activityReportLoadError = true
}

export function RESET_LOAD_ERROR(state) {
  state.activityReportLoadError = false
}

export function RELOAD(state) {
  state.didLoadActivityReport = false
}
