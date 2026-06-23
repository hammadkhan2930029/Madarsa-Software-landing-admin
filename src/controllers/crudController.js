const asyncHandler = require('../utils/asyncHandler')

function createCrudController(service) {
  return {
    list: asyncHandler(async (req, res) => {
      res.json(await service.list())
    }),

    get: asyncHandler(async (req, res) => {
      res.json(await service.get(req.params.id))
    }),

    create: asyncHandler(async (req, res) => {
      res.status(201).json(await service.create(req.body))
    }),

    update: asyncHandler(async (req, res) => {
      res.json(await service.update(req.params.id, req.body))
    }),

    remove: asyncHandler(async (req, res) => {
      res.json(await service.remove(req.params.id))
    }),

    getSingleton: asyncHandler(async (req, res) => {
      const rows = await service.list()
      res.json(rows[0] || null)
    }),

    updateSingleton: asyncHandler(async (req, res) => {
      res.json(await service.replaceSingleton(req.body))
    }),
  }
}

module.exports = { createCrudController }
