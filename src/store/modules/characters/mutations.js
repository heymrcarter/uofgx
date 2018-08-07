import Vue from 'vue'

export function SET_MEMBER_CHARACTERS(state, { membershipId, characters }) {
  Vue.set(state.memberCharacters, membershipId, characters)
}
