SET @column_exists := (
  SELECT COUNT(*)
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'footer_section'
    AND column_name = 'cta_video_url'
);
SET @statement := IF(
  @column_exists = 0,
  'ALTER TABLE footer_section ADD COLUMN cta_video_url VARCHAR(500) NULL AFTER cta_href',
  'SELECT 1'
);
PREPARE stmt FROM @statement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @column_exists := (
  SELECT COUNT(*)
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'footer_section'
    AND column_name = 'cta_image_url'
);
SET @statement := IF(
  @column_exists = 0,
  'ALTER TABLE footer_section ADD COLUMN cta_image_url VARCHAR(255) NULL AFTER cta_video_url',
  'SELECT 1'
);
PREPARE stmt FROM @statement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @column_exists := (
  SELECT COUNT(*)
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'footer_section'
    AND column_name = 'cta_image_alt'
);
SET @statement := IF(
  @column_exists = 0,
  'ALTER TABLE footer_section ADD COLUMN cta_image_alt VARCHAR(255) NULL AFTER cta_image_url',
  'SELECT 1'
);
PREPARE stmt FROM @statement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
