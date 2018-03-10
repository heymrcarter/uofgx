export function SET_SESSION(state, session) {
  state.accessToken = session.access_token
  state.expiresIn = session.expires_in
  state.hasAccess = session.has_access || false
  state.membershipId = session.membership_id
  state.tokenType = session.token_type
}

export function GRANT_ACCESS(state, membershipId) {
  if (state.membershipId === membershipId) {
    state.hasAccess = true
  }
}

export function SESSION_EXPIRED(state) {
  state.showExpiredDialog = true
  state.accessToken = undefined
  state.expiresIn = undefined
  state.hasAccess = false
  state.membershipId = undefined
  state.tokenType = undefined
}
