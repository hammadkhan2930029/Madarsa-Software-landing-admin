const bcrypt = require('bcrypt')
const { pool, query } = require('../config/db')

async function upsertSingleton(table, data) {
  const [existing] = await query(`SELECT id FROM ${table} ORDER BY id ASC LIMIT 1`)
  const columns = Object.keys(data)
  if (existing) {
    await query(
      `UPDATE ${table} SET ${columns.map((column) => `${column} = ?`).join(', ')} WHERE id = ?`,
      [...columns.map((column) => data[column]), existing.id],
    )
    return
  }

  await query(
    `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`,
    columns.map((column) => data[column]),
  )
}

async function seedCollection(table, rows) {
  const existing = await query(`SELECT id FROM ${table} LIMIT 1`)
  if (existing.length) return

  for (const row of rows) {
    const columns = Object.keys(row)
    await query(
      `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`,
      columns.map((column) => row[column]),
    )
  }
}

async function run() {
  const passwordHash = await bcrypt.hash('12345678', 12)
  await query(
    `INSERT INTO admins (name, email, password_hash, role, status)
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), name = VALUES(name), role = VALUES(role), status = VALUES(status)`,
    ['Admin', 'admin@madarsa.com', passwordHash, 'admin', 'active'],
  )

  await upsertSingleton('site_settings', {
    site_title: 'مدرسہ سافٹ ویئر',
    meta_description: 'جدید مدرسہ مینجمنٹ کے لیے مکمل سافٹ ویئر حل۔',
    favicon: '/favicon.svg',
    logo_light: '/assets/new1.png',
    logo_dark: '/assets/new2.png',
  })

  await upsertSingleton('hero_section', {
    kicker: 'مکمل فرنٹ اینڈ اور بیک اینڈ کے ساتھ مدرسہ مینجمنٹ پلیٹ فارم',
    title: 'مدرسہ کے تمام انتظامی کام ایک جدید ڈیش بورڈ میں سنبھالیں۔',
    description: 'طلبہ، اساتذہ، کلاسز، حاضری، مالیات، حفظ کی پیش رفت اور رپورٹس کے لیے تیز، صاف اور باقاعدہ سافٹ ویئر۔',
    primary_cta: 'ماڈیولز دیکھیں',
    primary_href: '#slider',
    secondary_cta: 'خصوصیات دیکھیں',
    secondary_href: '#features',
    status: 'active',
  })

  await seedCollection('hero_images', [
    { image_url: 'dashboard1.png', alt_text: 'ڈیش بورڈ', sort_order: 1, status: 'active' },
    { image_url: 'dashboard2.png', alt_text: 'ڈیش بورڈ', sort_order: 2, status: 'active' },
    { image_url: 'one.png', alt_text: 'طلبہ', sort_order: 3, status: 'active' },
    { image_url: 'two.png', alt_text: 'اساتذہ', sort_order: 4, status: 'active' },
    { image_url: 'three.png', alt_text: 'مالیات', sort_order: 5, status: 'active' },
    { image_url: 'four.png', alt_text: 'حفظ', sort_order: 6, status: 'active' },
  ])

  await seedCollection('nav_links', [
    { label: 'خصوصیات', href: '#features', placement: 'header/footer', sort_order: 1, status: 'active' },
    { label: 'ماڈیولز', href: '#slider', placement: 'header/footer', sort_order: 2, status: 'active' },
    { label: 'ڈیمو', href: '#contact', placement: 'header/footer', sort_order: 3, status: 'active' },
    { label: 'رابطہ', href: '/contact', placement: 'header', sort_order: 4, status: 'active' },
  ])

  await seedCollection('stats', [
    { name: 'ڈیش بورڈ', value: 'براہ راست جائزہ', sort_order: 1, status: 'active' },
    { name: 'حاضری', value: 'آج 94%', sort_order: 2, status: 'active' },
    { name: 'فیس اسٹیٹس', value: '312 باقی', sort_order: 3, status: 'active' },
    { name: 'حفظ رپورٹ', value: '18 اپ ڈیٹس', sort_order: 4, status: 'active' },
  ])

  await seedCollection('slider_modules', [
    { label: 'طلبہ', title: 'طلبہ ماڈیول صاف اور منظم انداز میں۔', description: 'داخلہ، حاضری، فیس، اور طالب علم کی مکمل پروفائل ایک ہی جگہ محفوظ کی جائے۔', stat: '+1,240', stat_label: 'طلبہ کا ریکارڈ', image_url: 'one.png', sort_order: 1, status: 'active' },
    { label: 'اساتذہ', title: 'اساتذہ کا شیڈول اور حاضری آسانی سے manage کریں۔', description: 'اساتذہ کے اوقات، روزانہ حاضری، کلاس تقسیم، اور کارکردگی کا جائزہ ایک dashboard میں۔', stat: '86', stat_label: 'اسٹاف پروفائلز', image_url: 'two.png', sort_order: 2, status: 'active' },
    { label: 'مالیات', title: 'آمدن، اخراجات اور فیس کا مکمل مالیاتی نظام۔', description: 'فیس جنریشن، بقایا جات، آمدن، اخراجات، تنخواہ اور رپورٹس کو واضح انداز میں ٹریک کریں۔', stat: 'PKR', stat_label: 'مالیاتی نگرانی', image_url: 'three.png', sort_order: 3, status: 'active' },
    { label: 'حفظ', title: 'حفظ کے طلبہ کی روزانہ پیش رفت محفوظ رکھیں۔', description: 'روزانہ سبق، ہفتہ وار رپورٹ، ماہانہ جائزہ اور سپارہ ٹریکنگ کے ساتھ حفظ کی نگرانی۔', stat: '4', stat_label: 'حفظ ماڈیولز', image_url: 'four.png', sort_order: 4, status: 'active' },
  ])

  await seedCollection('features', [
    { title: 'طلبہ کا مکمل نظام', description: 'داخلہ فارم، پروفائل، والدین کی معلومات، کلاس الاٹمنٹ اور فیس ریکارڈ ایک جگہ محفوظ کریں۔', value: '01', sort_order: 1, status: 'active' },
    { title: 'حاضری اور شیڈول', description: 'طلبہ اور اساتذہ کی روزانہ حاضری، کلاس شیڈول اور تاریخ آسانی سے ٹریک کریں۔', value: '02', sort_order: 2, status: 'active' },
    { title: 'فنانس مینجمنٹ', description: 'فیس جنریشن، آمدن، اخراجات، تنخواہ، فنڈ کلیکشن اور رپورٹس کے لیے منظم ماڈیولز۔', value: '03', sort_order: 3, status: 'active' },
    { title: 'حفظ پراگریس', description: 'روزانہ سبق، ہفتہ وار رپورٹ، ماہانہ جائزہ اور سپارہ ٹریکنگ کے ساتھ حفظ کی نگرانی کریں۔', value: '04', sort_order: 4, status: 'active' },
    { title: 'امتحانات اور نتائج', description: 'امتحانی شیڈول، گریڈز، نتائج اور رپورٹس کو صاف dashboard flow میں manage کریں۔', value: '05', sort_order: 5, status: 'active' },
    { title: 'رول بیسڈ ورک فلو', description: 'ایڈمن، برانچ، استاد اور اسٹاف کے لیے ذمہ داری کے مطابق سادہ اور محفوظ access flow۔', value: '06', sort_order: 6, status: 'active' },
  ])

  await upsertSingleton('feature_section', {
    kicker: 'اہم خصوصیات',
    title: 'مدرسہ کے ہر شعبے کے لیے مکمل حل۔',
    description: 'یہ سافٹ ویئر روزمرہ کے انتظامی کاموں کو کم وقت میں مکمل کرنے کے لیے بنایا گیا ہے، تاکہ ٹیم ریکارڈ، رپورٹس اور فالو اپ آسانی سے manage کر سکے۔',
    card_link_label: 'مزید جانیں',
  })

  await upsertSingleton('demo_section', {
    kicker: 'ڈیمو درخواست',
    title: 'ڈیمو اکاؤنٹ حاصل کریں۔',
    description: 'اپنی بنیادی معلومات بھیجیں۔ ہماری ٹیم آپ کو demo login اور password دے کر سسٹم کا مکمل walkthrough فراہم کرے گی۔',
    submit_label: 'درخواست بھیجیں',
    success_message: 'آپ کی درخواست محفوظ ہو گئی ہے۔ ہماری ٹیم جلد رابطہ کرے گی۔',
  })

  await seedCollection('demo_benefits', [
    { label: 'مفت ڈیمو', icon: 'download', sort_order: 1, status: 'active' },
    { label: 'ہر وقت بیک اپ', icon: 'backup', sort_order: 2, status: 'active' },
    { label: 'آسان سپورٹ', icon: 'support', sort_order: 3, status: 'active' },
  ])

  await upsertSingleton('footer_section', {
    cta_kicker: 'مدرسہ مینجمنٹ کو آج ہی آسان بنائیں',
    cta_title: 'مکمل ڈیمو دیکھیں اور اپنی ٹیم کے لیے بہترین flow منتخب کریں۔',
    cta_button: 'ڈیمو درخواست دیں',
    cta_href: '/contact',
    description: 'جدید مدرسہ مینجمنٹ کے لیے مکمل سافٹ ویئر حل۔',
    copyright: '© 2026 مدرسہ سافٹ ویئر۔ تمام حقوق محفوظ ہیں۔',
  })

  await seedCollection('contact_items', [
    { label: 'ای میل', value: 'info@madrasasoftware.com', helper: 'ڈیمو اور سپورٹ درخواست کے لیے', sort_order: 1, status: 'active' },
    { label: 'فون', value: '+92-331-9998780', helper: 'سیلز ٹیم سے براہ راست رابطہ', sort_order: 2, status: 'active' },
    { label: 'مقام', value: 'کراچی، پاکستان', helper: 'آن لائن ڈیمو دستیاب ہے', sort_order: 3, status: 'active' },
    { label: 'دفتر کا پتہ', value: 'R-5, Row 5, Block D, NCECHS, Gulshan-e-iqbal Block 10A, Rashid Minhas Road, Karachi, Pakistan.', helper: 'فوتر اور رابطہ صفحہ کا پتہ', sort_order: 4, status: 'active' },
  ])

  await seedCollection('media_assets', [
    { name: 'لائٹ لوگو', file_url: 'new1.png', type: 'logo', used_in: 'navbar/footer/splash', alt_text: 'لائٹ لوگو', status: 'active' },
    { name: 'ڈارک لوگو', file_url: 'new2.png', type: 'logo', used_in: 'navbar/footer/splash', alt_text: 'ڈارک لوگو', status: 'active' },
    { name: 'ہیرو ڈیش بورڈ', file_url: 'dashboard1.png', type: 'screenshot', used_in: 'hero', alt_text: 'ڈیش بورڈ', status: 'active' },
  ])

  console.log('Seed data created. Admin: admin@madarsa.com / 12345678')
  await pool.end()
}

run().catch(async (error) => {
  console.error(error)
  await pool.end()
  process.exit(1)
})
