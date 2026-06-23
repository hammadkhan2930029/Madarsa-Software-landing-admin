const { query } = require('../config/db')
const asyncHandler = require('../utils/asyncHandler')
const services = require('../services/cmsServices')

const getLanding = asyncHandler(async (req, res) => {
  const [
    settings,
    hero,
    heroImages,
    navLinks,
    stats,
    sliderModules,
    features,
    demoSection,
    footer,
    contactItems,
  ] = await Promise.all([
    services.settings.list(),
    services.hero.list({ activeOnly: true }),
    services.heroImages.list({ activeOnly: true }),
    services.navLinks.list({ activeOnly: true }),
    services.stats.list({ activeOnly: true }),
    services.sliderModules.list({ activeOnly: true }),
    services.features.list({ activeOnly: true }),
    services.demoSection.list(),
    services.footer.list(),
    services.contactItems.list({ activeOnly: true }),
  ])

  res.json({
    settings: settings[0] || null,
    hero: hero[0] || null,
    heroImages,
    navLinks,
    stats,
    sliderModules,
    features,
    demoSection: demoSection[0] || null,
    footer: footer[0] || null,
    contactItems,
  })
})

const createDemoRequest = asyncHandler(async (req, res) => {
  const { name, phone, email, madarsa } = req.body
  if (!name || !phone || !email || !madarsa) {
    res.status(400).json({ message: 'Name, phone, email and madarsa are required' })
    return
  }

  const result = await query(
    'INSERT INTO demo_requests (name, phone, email, madarsa, status) VALUES (?, ?, ?, ?, ?)',
    [name, phone, email, madarsa, 'new'],
  )
  res.status(201).json({ id: result.insertId, message: 'Demo request saved' })
})

module.exports = { getLanding, createDemoRequest }
