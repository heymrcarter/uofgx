export default {
  SET_CLAN_MEMBERS(state, members) {
    state.clanMembers = members
  },
  SET_INACTIVE_MEMBERS(state, inactiveMembers) {
    state.inactiveMembers = inactiveMembers
  },
  SET_ACTIVE_MEMBER(state, member) {
    state.activeMember = member
  },
  RESET_ACTIVE_MEMBER(state) {
    state.activeMember = undefined
  },
  SET_SESSION(state, session) {
    state.session = session
  },
  GRANT_ACCESS(state, membershipId) {
    if (state.session.membershipId === membershipId) {
      state.session.hasAccess = true
    }
  }
}
