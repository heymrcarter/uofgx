import * as roadmapService from '@/services/RoadmapService'

export function getRoadmap({ commit }) {
  return new Promise((resolve, reject) => {
    roadmapService.getRoadmap().then(roadmap => {
      commit('SET_ROADMAP', roadmap)
      resolve()
    })
  })
}
