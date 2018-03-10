export default {
  SET_CLAN_MEMBERS(state, members) {
    state.clanMembers = members
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
  SET_ACTIVE_MEMBER_CHARACTER_ACTIVITY(state, activity) {
    state.activeMemberCharacterActivity = activity
  },
  SET_ACTIVITY_DETAILS(state, details) {
    state.activityDetails[details.activityDetails.instanceId] = details
  },
  CACHE_MEMBER_CHARACTERS(state, { characters, membershipId }) {
    state.charactersCache[membershipId] = characters
  },
  SET_PENDING_MEMBERS(state, pendingMembers) {
    state.pendingMembers = pendingMembers
  },
  SET_INVITED_MEMBERS(state, invitedMembers) {
    state.invitedMembers = invitedMembers
  },
  APPROVE_MEMBERSHIPS(state, membershipIds) {
    membershipIds.forEach(membershipId => {
      let index = state.invitedMembers.findIndex(m => m.destinyUserInfo.membershipId === membershipId)
      if (index > -1) {
        state.invitedMembers[index].resolveState = 1
      } else {
        index = state.pendingMembers.findIndex(m => m.destinyUserInfo.membershipId === membershipId)
        if (index > -1) {
          state.pendingMembers[index].resolveState = 1
        }
      }
    })
  },
  DENY_MEMBERSHIPS(state, membershipIds) {
    membershipIds.forEach(membershipId => {
      let index = state.invitedMembers.findIndex(m => m.destinyUserInfo.membershipId === membershipId)
      if (index > -1) {
        state.invitedMembers[index].resolveState = 2
      } else {
        index = state.pendingMembers.findIndex(m => m.destinyUserInfo.membershipId === membershipId)
        if (index > -1) {
          state.pendingMembers[index].resolveState = 2
        }
      }
    })
  },
  RESCIND_INVITATION(state, membershipId) {
    let index = state.invitedMembers.findIndex(m => m.destinyUserInfo.membershipId === membershipId)
    state.invitedMembers[index].resolveState = 3
  },
  SESSION_EXPIRED(state) {
    state.showSessionExpirationDialog = true
    state.session = undefined
  }
}
