function getMailConfig() {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to = process.env.DEMO_REQUEST_TO_EMAIL || user

  if (!host || !user || !pass || !to) {
    return null
  }

  return {
    transport: {
      host,
      port,
      secure: process.env.SMTP_SECURE === 'true' || port === 465,
      auth: { user, pass },
    },
    from: process.env.MAIL_FROM || `"Madarsa Software" <${user}>`,
    to,
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

async function sendDemoRequestEmail(request) {
  const config = getMailConfig()
  if (!config) {
    return { skipped: true }
  }

  let nodemailer
  try {
    nodemailer = require('nodemailer')
  } catch (error) {
    console.warn('Email skipped: nodemailer package is not installed.')
    return { skipped: true }
  }

  const transporter = nodemailer.createTransport(config.transport)
  const subject = `New demo request - ${request.name}`
  const text = [
    'New demo request received.',
    '',
    `Name: ${request.name}`,
    `Phone: ${request.phone}`,
    `Email: ${request.email}`,
    `Madarsa: ${request.madarsa}`,
  ].join('\n')
  const html = `
    <div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.7">
      <h2>نئی ڈیمو درخواست موصول ہوئی ہے</h2>
      <p><strong>نام:</strong> ${escapeHtml(request.name)}</p>
      <p><strong>فون:</strong> ${escapeHtml(request.phone)}</p>
      <p><strong>ای میل:</strong> ${escapeHtml(request.email)}</p>
      <p><strong>مدرسہ:</strong> ${escapeHtml(request.madarsa)}</p>
    </div>
  `

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    subject,
    text,
    html,
    replyTo: request.email,
  })

  return { sent: true }
}

module.exports = { sendDemoRequestEmail }
