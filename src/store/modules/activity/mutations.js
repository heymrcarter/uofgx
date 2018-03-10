export function SET_ACTIVITY_DETAILS(state, details) {
  state.details[details.activityDetails.instanceId] = details
}
