CREATE TABLE IF NOT EXISTS slider_section (
  id INT AUTO_INCREMENT PRIMARY KEY,
  kicker VARCHAR(255),
  heading_line_one VARCHAR(255),
  heading_line_two VARCHAR(255),
  alignment VARCHAR(20) NOT NULL DEFAULT 'right'
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

SET @column_exists := (
  SELECT COUNT(*)
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'slider_modules'
    AND column_name = 'card_heading'
);
SET @statement := IF(
  @column_exists = 0,
  'ALTER TABLE slider_modules ADD COLUMN card_heading VARCHAR(255) NULL AFTER title',
  'SELECT 1'
);
PREPARE stmt FROM @statement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @column_exists := (
  SELECT COUNT(*)
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'slider_modules'
    AND column_name = 'alt_text'
);
SET @statement := IF(
  @column_exists = 0,
  'ALTER TABLE slider_modules ADD COLUMN alt_text VARCHAR(255) NULL AFTER image_url',
  'SELECT 1'
);
PREPARE stmt FROM @statement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @column_exists := (
  SELECT COUNT(*)
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'slider_modules'
    AND column_name = 'is_default'
);
SET @statement := IF(
  @column_exists = 0,
  'ALTER TABLE slider_modules ADD COLUMN is_default TINYINT(1) NOT NULL DEFAULT 0 AFTER alt_text',
  'SELECT 1'
);
PREPARE stmt FROM @statement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
