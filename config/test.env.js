'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_KEY: '"api-key"',
  API_BASE_URL: '"api-base-url"',
  CLAN_ID: '"clan-id"',
  AUTH_ENDPOINT: '"auth-endpoint"',
  CLIENT_ID: '"client-id"',
  OAUTH_SECRET: '"oauth-secret"',
  ANALYTICS_ENABLED: 'true'
})
