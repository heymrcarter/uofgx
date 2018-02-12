export default {
  SET_CLAN_MEMBERS(state, members) {
    state.clanMembers = members
  },
  SET_ACTIVITY_REPORT(state, report) {
    state.activityReport = report
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
    if (state.session.membership_id === membershipId) {
      state.session.hasAccess = true
    }
  },
  SET_EXEMPTIONS(state, exemptions) {
    state.exemptions = exemptions
  },
  SAVE_EXEMPTION(state, exemption) {
    if (!state.exemptions[exemption.membershipId]) {
      state.exemptions[exemption.membershipId] = {
        membershipId: exemption.membershipId,
        history: [],
        numberExemptions: 0
      }
    }

    state.exemptions[exemption.membershipId].history.push(exemption)
    state.exemptions[exemption.membershipId].numberExemptions++
  }
}
