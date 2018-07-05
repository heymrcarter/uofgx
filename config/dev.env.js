'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_KEY: '"b5cf1e00bfe644f9bf294f31fe3ea71d"',
  API_BASE_URL: '"http://localhost:3000"',
  CLAN_ID: '"1789424"',
  AUTH_ENDPOINT: '"https://www.bungie.net/en/OAuth/Authorize"',
  CLIENT_ID: '"23566"',
  OAUTH_SECRET: '"will you be my destiny dad?"',
  ANALYTICS_ENABLED: 'false'
})
