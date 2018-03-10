export default {
  SET_CLAN_MEMBERS(state, members) {
    state.clanMembers = members
  },
  SET_SESSION(state, session) {
    state.session = session
  },
  GRANT_ACCESS(state, membershipId) {
    if (state.session.membership_id === membershipId) {
      state.session.hasAccess = true
    }
  },
  SET_ACTIVE_MEMBER_CHARACTER_ACTIVITY(state, activity) {
    state.activeMemberCharacterActivity = activity
  },
  SET_ACTIVITY_DETAILS(state, details) {
    state.activityDetails[details.activityDetails.instanceId] = details
  },
  SESSION_EXPIRED(state) {
    state.showSessionExpirationDialog = true
    state.session = undefined
  }
}
