const { query } = require('../config/db')
const asyncHandler = require('../utils/asyncHandler')
const services = require('../services/cmsServices')
const { sendDemoRequestEmail } = require('../services/mailService')

const getLanding = asyncHandler(async (req, res) => {
  const [
    settings,
    hero,
    heroImages,
    navLinks,
    stats,
    sliderModules,
    features,
    featureSection,
    demoSection,
    demoBenefits,
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
    services.featureSection.list(),
    services.demoSection.list(),
    services.demoBenefits.list({ activeOnly: true }),
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
    featureSection: featureSection[0] || null,
    demoSection: demoSection[0] || null,
    demoBenefits,
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

  sendDemoRequestEmail({ name, phone, email, madarsa }).catch((error) => {
    console.error('Demo request email failed:', error.message)
  })

  res.status(201).json({ id: result.insertId, message: 'Demo request saved' })
})

module.exports = { getLanding, createDemoRequest }
