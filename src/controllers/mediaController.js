const fs = require('fs/promises')
const path = require('path')
const asyncHandler = require('../utils/asyncHandler')
const services = require('../services/cmsServices')

const list = asyncHandler(async (req, res) => {
  res.json(await services.media.list())
})

const upload = asyncHandler(async (req, res) => {
  const file = req.file
  if (!file) {
    res.status(400).json({ message: 'Image file is required' })
    return
  }

  const record = await services.media.create({
    name: req.body.name || file.originalname,
    fileUrl: `/uploads/${file.filename}`,
    type: req.body.type || 'image',
    usedIn: req.body.usedIn || '',
    altText: req.body.altText || req.body.name || file.originalname,
    status: req.body.status || 'active',
  })

  res.status(201).json({
    id: record.id,
    name: record.name,
    fileUrl: record.fileUrl,
  })
})

const remove = asyncHandler(async (req, res) => {
  const record = await services.media.get(req.params.id)
  await services.media.remove(req.params.id)

  if (record.fileUrl?.startsWith('/uploads/')) {
    const absolutePath = path.resolve(record.fileUrl.slice(1))
    await fs.rm(absolutePath, { force: true })
  }

  res.json({ id: Number(req.params.id), deleted: true })
})

module.exports = { list, upload, remove }
