SET NAMES utf8mb4;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;

USE `madarsa_landing_backend`;

INSERT INTO `site_settings` (`id`, `site_title`, `meta_description`, `favicon`, `logo_light`, `logo_dark`) VALUES
(1, 'مدرسہ سافٹ ویئر', 'جدید مدرسہ مینجمنٹ کے لئے مکمل سافٹ ویئر حل۔', '/favicon.svg', '/assets/new1.png', '/assets/new2.png')
ON DUPLICATE KEY UPDATE
  `site_title` = VALUES(`site_title`),
  `meta_description` = VALUES(`meta_description`),
  `favicon` = VALUES(`favicon`),
  `logo_light` = VALUES(`logo_light`),
  `logo_dark` = VALUES(`logo_dark`);

INSERT INTO `hero_section` (`id`, `kicker`, `title`, `description`, `primary_cta`, `primary_href`, `secondary_cta`, `secondary_href`, `status`) VALUES
(1, 'مکمل فرنٹ اینڈ اور بیک اینڈ کے ساتھ مدرسہ مینجمنٹ پلیٹ فارم', 'مدرسے کے تمام انتظامی کام ایک جدید ڈیش بورڈ میں سنبھالیں۔', 'طلبہ، اساتذہ، کلاسز، حاضری، مالیات، حفظ کی پیش رفت اور رپورٹس کے لئے تیز، صاف اور باقاعدہ سافٹ ویئر۔', 'ماڈیولز دیکھیں', '#slider', 'خصوصیات دیکھیں', '#features', 'active')
ON DUPLICATE KEY UPDATE
  `kicker` = VALUES(`kicker`),
  `title` = VALUES(`title`),
  `description` = VALUES(`description`),
  `primary_cta` = VALUES(`primary_cta`),
  `primary_href` = VALUES(`primary_href`),
  `secondary_cta` = VALUES(`secondary_cta`),
  `secondary_href` = VALUES(`secondary_href`),
  `status` = VALUES(`status`);

INSERT INTO `nav_links` (`id`, `label`, `href`, `placement`, `sort_order`, `status`) VALUES
(1, 'خصوصیات', '#features', 'header/footer', 1, 'active'),
(2, 'ماڈیولز', '#slider', 'header/footer', 2, 'active'),
(3, 'ڈیمو', '#contact', 'header/footer', 3, 'active'),
(4, 'رابطہ', '/contact', 'header', 4, 'active')
ON DUPLICATE KEY UPDATE
  `label` = VALUES(`label`),
  `href` = VALUES(`href`),
  `placement` = VALUES(`placement`),
  `sort_order` = VALUES(`sort_order`),
  `status` = VALUES(`status`);

INSERT INTO `stats` (`id`, `name`, `value`, `sort_order`, `status`) VALUES
(1, 'ڈیش بورڈ', 'براہ راست جائزہ', 1, 'active'),
(2, 'حاضری', 'آج 94%', 2, 'active'),
(3, 'فیس اسٹیٹس', '312 باقی', 3, 'active'),
(4, 'حفظ رپورٹ', '18 اپ ڈیٹس', 4, 'active')
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `value` = VALUES(`value`),
  `sort_order` = VALUES(`sort_order`),
  `status` = VALUES(`status`);

INSERT INTO `slider_modules` (`id`, `label`, `title`, `description`, `stat`, `stat_label`, `image_url`, `sort_order`, `status`) VALUES
(1, 'طلبہ', 'طلبہ ماڈیول صاف اور منظم انداز میں۔', 'داخلہ، حاضری، فیس اور طالب علم کی مکمل پروفائل ایک ہی جگہ محفوظ کریں۔', '+1,240', 'طلبہ کا ریکارڈ', 'one.png', 1, 'active'),
(2, 'اساتذہ', 'اساتذہ کا شیڈول اور حاضری آسانی سے منظم کریں۔', 'اساتذہ کے اوقات، روزانہ حاضری، کلاس تقسیم اور کارکردگی کا جائزہ ایک ڈیش بورڈ میں۔', '86', 'اسٹاف پروفائلز', 'two.png', 2, 'active'),
(3, 'مالیات', 'آمدن، اخراجات اور فیس کا مکمل مالیاتی نظام۔', 'فیس جنریشن، بقایا جات، آمدن، اخراجات، تنخواہ اور رپورٹس کو واضح انداز میں ٹریک کریں۔', 'PKR', 'مالیاتی نگرانی', 'three.png', 3, 'active'),
(4, 'حفظ', 'حفظ کے طلبہ کی روزانہ پیش رفت محفوظ رکھیں۔', 'روزانہ سبق، ہفتہ وار رپورٹ، ماہانہ جائزہ اور سپارہ ٹریکنگ کے ساتھ حفظ کی نگرانی۔', '4', 'حفظ ماڈیولز', 'four.png', 4, 'active')
ON DUPLICATE KEY UPDATE
  `label` = VALUES(`label`),
  `title` = VALUES(`title`),
  `description` = VALUES(`description`),
  `stat` = VALUES(`stat`),
  `stat_label` = VALUES(`stat_label`),
  `image_url` = VALUES(`image_url`),
  `sort_order` = VALUES(`sort_order`),
  `status` = VALUES(`status`);

INSERT INTO `features` (`id`, `title`, `description`, `value`, `sort_order`, `status`) VALUES
(1, 'طلبہ کا مکمل نظام', 'داخلہ فارم، پروفائل، والدین کی معلومات، کلاس الاٹمنٹ اور فیس ریکارڈ ایک جگہ محفوظ کریں۔', '01', 1, 'active'),
(2, 'حاضری اور شیڈول', 'طلبہ اور اساتذہ کی روزانہ حاضری، کلاس شیڈول اور تاریخ آسانی سے ٹریک کریں۔', '02', 2, 'active'),
(3, 'فنانس مینجمنٹ', 'فیس جنریشن، آمدن، اخراجات، تنخواہ، فنڈ کلیکشن اور رپورٹس کے لئے منظم ماڈیولز۔', '03', 3, 'active'),
(4, 'حفظ پراگریس', 'روزانہ سبق، ہفتہ وار رپورٹ، ماہانہ جائزہ اور سپارہ ٹریکنگ کے ساتھ حفظ کی نگرانی کریں۔', '04', 4, 'active'),
(5, 'امتحانات اور نتائج', 'امتحانی شیڈول، گریڈز، نتائج اور رپورٹس کو صاف ڈیش بورڈ فلو میں منظم کریں۔', '05', 5, 'active'),
(6, 'رول بیسڈ ورک فلو', 'ایڈمن، برانچ، استاد اور اسٹاف کے لئے ذمہ داری کے مطابق سادہ اور محفوظ رسائی۔', '06', 6, 'active')
ON DUPLICATE KEY UPDATE
  `title` = VALUES(`title`),
  `description` = VALUES(`description`),
  `value` = VALUES(`value`),
  `sort_order` = VALUES(`sort_order`),
  `status` = VALUES(`status`);

INSERT INTO `demo_section` (`id`, `kicker`, `title`, `description`, `submit_label`, `success_message`) VALUES
(1, 'ڈیمو درخواست', 'ڈیمو اکاؤنٹ حاصل کریں۔', 'اپنی بنیادی معلومات بھیجیں، ہماری ٹیم آپ کو ڈیمو لاگ اِن اور پاس ورڈ دے کر سسٹم کا مکمل جائزہ فراہم کرے گی۔', 'درخواست بھیجیں', 'آپ کی درخواست محفوظ ہو گئی ہے۔ ہماری ٹیم جلد رابطہ کرے گی۔')
ON DUPLICATE KEY UPDATE
  `kicker` = VALUES(`kicker`),
  `title` = VALUES(`title`),
  `description` = VALUES(`description`),
  `submit_label` = VALUES(`submit_label`),
  `success_message` = VALUES(`success_message`);

INSERT INTO `footer_section` (`id`, `cta_kicker`, `cta_title`, `cta_button`, `cta_href`, `description`, `copyright`) VALUES
(1, 'مدرسہ مینجمنٹ کو آج ہی آسان بنائیں', 'مکمل ڈیمو دیکھیں اور اپنی ٹیم کے لئے بہترین فلو منتخب کریں۔', 'ڈیمو درخواست دیں', '/contact', 'جدید مدرسہ مینجمنٹ کے لئے مکمل سافٹ ویئر حل۔', 'کاپی رائٹ 2026 مدرسہ سافٹ ویئر۔ تمام حقوق محفوظ ہیں۔')
ON DUPLICATE KEY UPDATE
  `cta_kicker` = VALUES(`cta_kicker`),
  `cta_title` = VALUES(`cta_title`),
  `cta_button` = VALUES(`cta_button`),
  `cta_href` = VALUES(`cta_href`),
  `description` = VALUES(`description`),
  `copyright` = VALUES(`copyright`);

INSERT INTO `contact_items` (`id`, `label`, `value`, `helper`, `sort_order`, `status`) VALUES
(1, 'ای میل', 'info@madrasasoftware.com', 'ڈیمو اور سپورٹ درخواست کے لئے', 1, 'active'),
(2, 'فون', '+92-331-9998780', 'سیلز ٹیم سے براہ راست رابطہ', 2, 'active'),
(3, 'مقام', 'کراچی، پاکستان', 'آن لائن ڈیمو دستیاب ہے', 3, 'active'),
(4, 'دفتر کا پتہ', 'R-5, Row 5, Block D, NCECHS, Gulshan-e-Iqbal Block 10A, Rashid Minhas Road, Karachi, Pakistan.', 'فوٹر اور رابطہ صفحہ کا پتہ', 4, 'active')
ON DUPLICATE KEY UPDATE
  `label` = VALUES(`label`),
  `value` = VALUES(`value`),
  `helper` = VALUES(`helper`),
  `sort_order` = VALUES(`sort_order`),
  `status` = VALUES(`status`);

INSERT INTO `media_assets` (`id`, `name`, `file_url`, `type`, `used_in`, `alt_text`, `status`) VALUES
(1, 'لائٹ لوگو', 'new1.png', 'logo', 'navbar/footer/splash', 'لائٹ لوگو', 'active'),
(2, 'ڈارک لوگو', 'new2.png', 'logo', 'navbar/footer/splash', 'ڈارک لوگو', 'active'),
(3, 'ہیرو ڈیش بورڈ', 'dashboard1.png', 'screenshot', 'hero', 'ڈیش بورڈ', 'active')
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `file_url` = VALUES(`file_url`),
  `type` = VALUES(`type`),
  `used_in` = VALUES(`used_in`),
  `alt_text` = VALUES(`alt_text`),
  `status` = VALUES(`status`);

COMMIT;
