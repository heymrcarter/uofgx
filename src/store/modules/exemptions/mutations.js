import Vue from 'vue'

export function SET_EXEMPTIONS(state, exemptions) {
  state.exemptions = exemptions
}

export function SAVE_EXEMPTION(state, exemption) {
  if (!state.exemptions[exemption.membershipId]) {
    Vue.set(state.exemptions, exemption.membershipId, {
      membershipId: exemption.membershipId,
      history: [],
      numberExemptions: 0
    })
  }

  state.exemptions[exemption.membershipId].history.push(exemption)
  state.exemptions[exemption.membershipId].numberExemptions++
}

export function LIFT_EXEMPTION(state, exemption) {
  const index = state.exemptions[exemption.membershipId].history.findIndex(e => e.id === exemption.id)
  state.exemptions[exemption.membershipId].history.splice(index, 1, exemption)
}
