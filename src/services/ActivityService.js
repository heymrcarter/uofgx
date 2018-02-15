import axios from 'axios'

export function getPostGameCarnageReport(activityId) {
  return new Promise((resolve, reject) => {
    const config = {
      baseURL: 'https://uofgx-server.cfapps.io',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    axios
      .get(`/activity/${activityId}`, config)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
