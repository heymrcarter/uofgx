'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_KEY: '"076f6b2b8b4541eda553476e9379f7e4"',
  API_BASE_URL: '"https://www.bungie.net/Platform"',
  CLAN_ID: '"1789424"',
  AUTH_ENDPOINT: '"https://www.bungie.net/en/OAuth/Authorize"',
  CLIENT_ID: '"23346"',
  OAUTH_SECRET: '"will you be my destiny dad?"',
  CLIENT_SECRET: '"GsLBFDR6D597L9TobHRNrOf6XMHZJfdzURv3cci9Uc4"',
  EXEMPTIONS_ENDPOINT: '"https://lttp6j3bv3.execute-api.us-east-1.amazonaws.com/dev/exemptions"'
})
