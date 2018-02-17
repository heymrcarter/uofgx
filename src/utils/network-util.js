import axios from 'axios'

const defaultConfig = {
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
}

export function get(endpoint) {
  return axios.get(endpoint, defaultConfig)
}

export function post(endpoint, body, headers) {
  const config = {}
  config.headers = Object.assign({}, defaultConfig.headers, headers)
  return axios.post(endpoint, body, config)
}
