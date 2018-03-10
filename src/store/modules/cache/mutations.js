export function CACHE_MEMBER_CHARACTERS(state, { characters, membershipId }) {
  state.characters[membershipId] = characters
}
