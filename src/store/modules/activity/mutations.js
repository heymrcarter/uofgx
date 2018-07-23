export function SET_ACTIVITY_DETAILS(state, details) {
  state.details[details.activityDetails.instanceId] = details
}

export function SET_ACTIVITY_OVERVIEW(state, activityOverview) {
  state.overview = activityOverview
}
