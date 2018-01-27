import axios from 'axios'
import qs from 'qs'

function getConfig() {
  return {
    baseURL: 'https://www.bungie.net/platform',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true
  }
}

export function getAccessToken(authorizationToken) {
  return new Promise((resolve, reject) => {
    const requestBody = {
      grant_type: 'authorization_code',
      code: authorizationToken,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    }

    axios
      .post('/app/oauth/token/', qs.stringify(requestBody), getConfig())
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}
