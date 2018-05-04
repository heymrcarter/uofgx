import { get, post } from '@/utils/network-util'

export function getRoadmap() {
  return new Promise((resolve, reject) => {
    get(`/roadmap`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export function submitFeatureRequest(featureRequest) {
  return new Promise((resolve, reject) => {
    post('/roadmap/suggestion', featureRequest)
      .then(() => resolve())
      .catch(error => reject(error))
  })
}
