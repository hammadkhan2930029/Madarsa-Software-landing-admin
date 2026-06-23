SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `madarsa_landing_backend` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `madarsa_landing_backend`;

CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(190) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) NOT NULL DEFAULT 'admin',
  `status` VARCHAR(20) NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `site_title` VARCHAR(255) NOT NULL,
  `meta_description` TEXT,
  `favicon` VARCHAR(255),
  `logo_light` VARCHAR(255),
  `logo_dark` VARCHAR(255),
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `hero_section` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `kicker` VARCHAR(255),
  `title` TEXT,
  `description` TEXT,
  `primary_cta` VARCHAR(150),
  `primary_href` VARCHAR(255),
  `secondary_cta` VARCHAR(150),
  `secondary_href` VARCHAR(255),
  `status` VARCHAR(20) NOT NULL DEFAULT 'active'
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `hero_images` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `image_url` VARCHAR(255) NOT NULL,
  `alt_text` VARCHAR(255),
  `sort_order` INT NOT NULL DEFAULT 0,
  `status` VARCHAR(20) NOT NULL DEFAULT 'active'
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `nav_links` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `label` VARCHAR(120) NOT NULL,
  `href` VARCHAR(255) NOT NULL,
  `placement` VARCHAR(120),
  `sort_order` INT NOT NULL DEFAULT 0,
  `status` VARCHAR(20) NOT NULL DEFAULT 'active'
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `stats` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(120) NOT NULL,
  `value` VARCHAR(120) NOT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `status` VARCHAR(20) NOT NULL DEFAULT 'active'
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `slider_modules` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `label` VARCHAR(120) NOT NULL,
  `title` TEXT,
  `description` TEXT,
  `stat` VARCHAR(120),
  `stat_label` VARCHAR(120),
  `image_url` VARCHAR(255),
  `sort_order` INT NOT NULL DEFAULT 0,
  `status` VARCHAR(20) NOT NULL DEFAULT 'active'
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `features` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `value` VARCHAR(50),
  `sort_order` INT NOT NULL DEFAULT 0,
  `status` VARCHAR(20) NOT NULL DEFAULT 'active'
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `demo_section` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `kicker` VARCHAR(255),
  `title` VARCHAR(255),
  `description` TEXT,
  `submit_label` VARCHAR(150),
  `success_message` TEXT
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `demo_requests` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(80) NOT NULL,
  `email` VARCHAR(190) NOT NULL,
  `madarsa` VARCHAR(190) NOT NULL,
  `status` VARCHAR(20) NOT NULL DEFAULT 'new',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `footer_section` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `cta_kicker` VARCHAR(255),
  `cta_title` TEXT,
  `cta_button` VARCHAR(150),
  `cta_href` VARCHAR(255),
  `description` TEXT,
  `copyright` VARCHAR(255)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `contact_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `label` VARCHAR(120) NOT NULL,
  `value` TEXT,
  `helper` TEXT,
  `sort_order` INT NOT NULL DEFAULT 0,
  `status` VARCHAR(20) NOT NULL DEFAULT 'active'
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `media_assets` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(190) NOT NULL,
  `file_url` VARCHAR(255) NOT NULL,
  `type` VARCHAR(80),
  `used_in` VARCHAR(190),
  `alt_text` VARCHAR(255),
  `status` VARCHAR(20) NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO `admins` (`id`, `name`, `email`, `password_hash`, `role`, `status`) VALUES
(1, 'Admin', 'admin@madarsa.com', '$2b$12$70NAiVyKwddZCXiZpz6lp.rkKk1NGnHEanzxu99uxfXFObqrflSYa', 'admin', 'active')
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `password_hash` = VALUES(`password_hash`),
  `role` = VALUES(`role`),
  `status` = VALUES(`status`);

INSERT INTO `site_settings` (`id`, `site_title`, `meta_description`, `favicon`, `logo_light`, `logo_dark`) VALUES
(1, 'Madarsa Software', 'Complete madarsa management software for students, teachers, attendance, finance, hifz progress and reports.', '/favicon.svg', '/assets/new1.png', '/assets/new2.png');

INSERT INTO `hero_section` (`id`, `kicker`, `title`, `description`, `primary_cta`, `primary_href`, `secondary_cta`, `secondary_href`, `status`) VALUES
(1, 'Complete madarsa management platform', 'Manage every madarsa workflow from one modern dashboard.', 'Students, teachers, classes, attendance, finance, hifz progress and reports are organized in one clean system.', 'View Modules', '#slider', 'View Features', '#features', 'active');

INSERT INTO `hero_images` (`id`, `image_url`, `alt_text`, `sort_order`, `status`) VALUES
(1, 'dashboard1.png', 'Dashboard', 1, 'active'),
(2, 'dashboard2.png', 'Reports dashboard', 2, 'active'),
(3, 'one.png', 'Students module', 3, 'active'),
(4, 'two.png', 'Teachers module', 4, 'active'),
(5, 'three.png', 'Finance module', 5, 'active'),
(6, 'four.png', 'Hifz module', 6, 'active');

INSERT INTO `nav_links` (`id`, `label`, `href`, `placement`, `sort_order`, `status`) VALUES
(1, 'Features', '#features', 'header/footer', 1, 'active'),
(2, 'Modules', '#slider', 'header/footer', 2, 'active'),
(3, 'Demo', '#contact', 'header/footer', 3, 'active'),
(4, 'Contact', '/contact', 'header', 4, 'active');

INSERT INTO `stats` (`id`, `name`, `value`, `sort_order`, `status`) VALUES
(1, 'Dashboard', 'Live overview', 1, 'active'),
(2, 'Attendance', 'Daily tracking', 2, 'active'),
(3, 'Finance', 'Fee status', 3, 'active'),
(4, 'Reports', 'Fast export', 4, 'active');

INSERT INTO `slider_modules` (`id`, `label`, `title`, `description`, `stat`, `stat_label`, `image_url`, `sort_order`, `status`) VALUES
(1, 'Students', 'Keep student records clean and organized.', 'Manage admission, profiles, guardian details, classes, attendance and fee records in one place.', '+1,240', 'student records', 'one.png', 1, 'active'),
(2, 'Teachers', 'Manage teacher schedules and attendance.', 'Track staff profiles, class allocation, daily attendance and performance from a simple dashboard.', '86', 'staff profiles', 'two.png', 2, 'active'),
(3, 'Finance', 'Track income, expenses and fees.', 'Manage fee generation, dues, income, expenses, salary and financial reports with clear records.', 'PKR', 'finance tracking', 'three.png', 3, 'active'),
(4, 'Hifz', 'Monitor daily hifz progress.', 'Record daily sabaq, weekly reports, monthly reviews and para tracking for hifz students.', '4', 'hifz modules', 'four.png', 4, 'active');

INSERT INTO `features` (`id`, `title`, `description`, `value`, `sort_order`, `status`) VALUES
(1, 'Student Management', 'Admission forms, profiles, guardian details, class allocation and fee records in one system.', '01', 1, 'active'),
(2, 'Attendance and Schedule', 'Track student and teacher attendance, class schedules and daily records.', '02', 2, 'active'),
(3, 'Finance Management', 'Fee generation, dues, income, expenses, salary and reports for organized finance.', '03', 3, 'active'),
(4, 'Hifz Progress', 'Daily lessons, weekly reports, monthly reviews and para tracking for hifz students.', '04', 4, 'active'),
(5, 'Exams and Results', 'Exam schedules, grades, results and reports in a clean workflow.', '05', 5, 'active'),
(6, 'Role Based Access', 'Simple and secure access for admin, branch, teacher and staff users.', '06', 6, 'active');

INSERT INTO `demo_section` (`id`, `kicker`, `title`, `description`, `submit_label`, `success_message`) VALUES
(1, 'Demo Request', 'Get a demo account.', 'Send your basic information and our team will share demo login details with you.', 'Send Request', 'Your request has been saved. Our team will contact you soon.');

INSERT INTO `footer_section` (`id`, `cta_kicker`, `cta_title`, `cta_button`, `cta_href`, `description`, `copyright`) VALUES
(1, 'Make madarsa management easier today', 'Book a complete demo and choose the best workflow for your team.', 'Request Demo', '/contact', 'Complete software solution for modern madarsa management.', 'Copyright 2026 Madarsa Software. All rights reserved.');

INSERT INTO `contact_items` (`id`, `label`, `value`, `helper`, `sort_order`, `status`) VALUES
(1, 'Email', 'info@madrasasoftware.com', 'For demo and support requests', 1, 'active'),
(2, 'Phone', '+92-331-9998780', 'Contact the sales team directly', 2, 'active'),
(3, 'Location', 'Karachi, Pakistan', 'Online demo available', 3, 'active'),
(4, 'Office Address', 'R-5, Row 5, Block D, NCECHS, Gulshan-e-Iqbal Block 10A, Rashid Minhas Road, Karachi, Pakistan.', 'Office and contact page address', 4, 'active');

INSERT INTO `media_assets` (`id`, `name`, `file_url`, `type`, `used_in`, `alt_text`, `status`) VALUES
(1, 'Light Logo', 'new1.png', 'logo', 'navbar/footer/splash', 'Light logo', 'active'),
(2, 'Dark Logo', 'new2.png', 'logo', 'navbar/footer/splash', 'Dark logo', 'active'),
(3, 'Hero Dashboard', 'dashboard1.png', 'screenshot', 'hero', 'Dashboard screenshot', 'active');

COMMIT;
