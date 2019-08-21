'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_PATH: '"http://172.18.226.156:8012/"',
  MOCK_ON: true,
  ENV_NAME: '"LOCAL"',
})
