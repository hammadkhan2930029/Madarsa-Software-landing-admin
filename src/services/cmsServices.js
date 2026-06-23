const configs = require('../config/cmsConfig')
const { createCrudService } = require('./crudService')

const services = Object.fromEntries(
  Object.entries(configs).map(([key, config]) => [key, createCrudService(config)]),
)

module.exports = services
