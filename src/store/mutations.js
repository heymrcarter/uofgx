export function SET_CLAN_ID(state, clanId) {
  state.clanId = clanId
}

export function SET_CLAN_NAME(state, clanName) {
  state.clanName = clanName
}

export function SET_MEMBERSHIP_TYPE(state, membershipType) {
  state.membershipType = membershipType
}

export function SET_CLAN_MILESTONES(state, milestones) {
  state.weeklyMilestones = milestones
}

export function START_LOADING_MILESTONES(state) {
  state.isLoadingWeeklyMilestones = true
  state.didLoadWeeklyMilestones = false
  state.weeklyMilestonesLoadError = false
}

export function FINISH_LOADING_MILESTONES(state) {
  state.isLoadingWeeklyMilestones = false
  state.didLoadWeeklyMilestones = true
}

export function MILESTONE_LOAD_ERROR(state) {
  state.weeklyMilestonesLoadError = true
}

export function RELOAD_WEEKLY_MILESTONES(state) {
  state.isLoadingWeeklyMilestones = true
  state.didLoadWeeklyMilestones = false
}
