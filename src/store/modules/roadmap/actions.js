import * as roadmapService from '@/services/RoadmapService'

export function getRoadmap({ commit }) {
  return new Promise((resolve, reject) => {
    roadmapService.getRoadmap().then(roadmap => {
      commit('SET_ROADMAP', roadmap)
      resolve()
    })
  })
}

export function submitSuggestion({ rootState }, suggestion) {
  return new Promise((resolve, reject) => {
    const member = rootState.members.list.find(m => m.bungieNetMembershipId === rootState.session.membershipId)
    const featureRequest = {
      name: suggestion.idea,
      desc: `${suggestion.description}\n\nSuggested by: ${member.bungieNetUserName} (${rootState.session.membershipId})`,
      pos: 'bottom'
    }

    roadmapService
      .submitFeatureRequest(featureRequest)
      .then(() => resolve())
      .catch(error => reject(error))
  })
}
