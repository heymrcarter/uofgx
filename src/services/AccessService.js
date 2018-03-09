import { post } from '@/utils/network-util'
import qs from 'qs'

export function getAccessToken(authorizationToken) {
  return new Promise((resolve, reject) => {
    const requestBody = {
      grant_type: 'authorization_code',
      code: authorizationToken,
      client_id: process.env.CLIENT_ID
    }

    post('https://www.bungie.net/platform/app/oauth/token/', qs.stringify(requestBody), { 'Content-Type': 'application/x-www-form-urlencoded' })
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}
