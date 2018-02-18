import Vue from 'vue'

export default {
  SET_CLAN_MEMBERS(state, members) {
    state.clanMembers = members
  },
  SET_ACTIVITY_REPORT(state, report) {
    state.activityReport = report
  },
  SET_ACTIVE_MEMBER(state, member) {
    member.gamertag = state.clanMembers.find(m => m.xboxMembershipId === member.membershipId).xboxUserName
    state.activeMember = member
    state.activeMemberCharacterActivity = undefined
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
      Vue.set(state.exemptions, exemption.membershipId, {
        membershipId: exemption.membershipId,
        history: [],
        numberExemptions: 0
      })
    }

    state.exemptions[exemption.membershipId].history.push(exemption)
    state.exemptions[exemption.membershipId].numberExemptions++
  },
  SET_ACTIVE_MEMBER_CHARACTER_ACTIVITY(state, activity) {
    state.activeMemberCharacterActivity = activity
  },
  SET_ACTIVITY_DETAILS(state, details) {
    state.activityDetails[details.activityDetails.instanceId] = details
  }
}
