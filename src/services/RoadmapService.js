import { get } from '@/utils/network-util'

export function getRoadmap() {
  return new Promise((resolve, reject) => {
    get(`/roadmap`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}
