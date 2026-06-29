const express = require('express')
const authController = require('../controllers/authController')
const demoRequestsController = require('../controllers/demoRequestsController')
const mediaController = require('../controllers/mediaController')
const { createCrudController } = require('../controllers/crudController')
const { requireAuth } = require('../middleware/auth')
const { upload } = require('../middleware/upload')
const services = require('../services/cmsServices')

const router = express.Router()

router.post('/auth/login', authController.login)
router.get('/auth/me', requireAuth, authController.me)
router.post('/auth/logout', requireAuth, authController.logout)

router.use(requireAuth)

function registerCollection(path, service) {
  const controller = createCrudController(service)
  router.get(path, controller.list)
  router.post(path, controller.create)
  router.put(`${path}/:id`, controller.update)
  router.delete(`${path}/:id`, controller.remove)
}

function registerSingleton(path, service) {
  const controller = createCrudController(service)
  router.get(path, controller.getSingleton)
  router.put(path, controller.updateSingleton)
}

registerSingleton('/settings', services.settings)
registerSingleton('/hero', services.hero)
registerCollection('/hero-images', services.heroImages)
registerCollection('/nav-links', services.navLinks)
registerCollection('/stats', services.stats)
registerSingleton('/slider-section', services.sliderSection)
registerCollection('/slider-modules', services.sliderModules)
registerCollection('/features', services.features)
registerSingleton('/feature-section', services.featureSection)
registerSingleton('/demo-section', services.demoSection)
registerCollection('/demo-benefits', services.demoBenefits)
registerSingleton('/footer', services.footer)
registerCollection('/contact-items', services.contactItems)

router.get('/demo-requests', demoRequestsController.list)
router.put('/demo-requests/:id/status', demoRequestsController.updateStatus)

router.get('/media', mediaController.list)
router.post('/media/upload', upload.single('file'), mediaController.upload)
router.delete('/media/:id', mediaController.remove)

module.exports = router
