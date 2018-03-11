export function RESET_ACTIVE_MEMBER(state) {
  state.membershipId = undefined
  state.characters = undefined
  state.characterActivity = undefined
  state.gamertag = undefined
}

export function SET_ACTIVE_MEMBER(state, { membershipId, characters, gamertag }) {
  state.membershipId = membershipId
  state.characters = characters
  state.characterActivity = undefined
  state.gamertag = gamertag
}

export function SET_ACTIVE_MEMBER_CHARACTER_ACTIVITY(state, activity) {
  state.characterActivity = activity
}

export function SET_ACTIVE_MEMBER_CHARACTERS(state, characters) {
  state.characters = characters
}
