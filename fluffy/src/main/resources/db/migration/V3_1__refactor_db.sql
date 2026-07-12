-- created_byとupdated_byを追加
ALTER TABLE users
	ADD COLUMN created_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER created_at,
	ADD COLUMN updated_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER updated_at;

ALTER TABLE account_types
	ADD COLUMN created_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER created_at,
	ADD COLUMN updated_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER updated_at;

ALTER TABLE account_templates
	ADD COLUMN created_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER created_at,
	ADD COLUMN updated_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER updated_at;

ALTER TABLE accounts
	ADD COLUMN created_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER created_at,
	ADD COLUMN updated_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER updated_at;

ALTER TABLE transaction_types
	ADD COLUMN created_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER created_at,
	ADD COLUMN updated_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER updated_at;

ALTER TABLE transfers
	ADD COLUMN created_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER created_at,
	ADD COLUMN updated_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER updated_at;

ALTER TABLE transactions
	ADD COLUMN created_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER created_at,
	ADD COLUMN updated_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER updated_at;

ALTER TABLE category_types
	ADD COLUMN created_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER created_at,
	ADD COLUMN updated_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER updated_at;

ALTER TABLE categories
	ADD COLUMN created_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER created_at,
	ADD COLUMN updated_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER updated_at;

ALTER TABLE category_mappings
	ADD COLUMN created_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER created_at,
	ADD COLUMN updated_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER updated_at;

ALTER TABLE gmail_credentials
	ADD COLUMN created_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER created_at,
	ADD COLUMN updated_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER updated_at;

ALTER TABLE gmail_import_logs
	ADD COLUMN created_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER created_at,
	ADD COLUMN updated_by VARCHAR(100) NOT NULL DEFAULT 'system' AFTER updated_at;

UPDATE users SET created_by = 'system', updated_by = 'system';
UPDATE account_types SET created_by = 'system', updated_by = 'system';
UPDATE account_templates SET created_by = 'system', updated_by = 'system';
UPDATE accounts SET created_by = 'system', updated_by = 'system';
UPDATE transaction_types SET created_by = 'system', updated_by = 'system';
UPDATE transfers SET created_by = 'system', updated_by = 'system';
UPDATE transactions SET created_by = 'system', updated_by = 'system';
UPDATE category_types SET created_by = 'system', updated_by = 'system';
UPDATE categories SET created_by = 'system', updated_by = 'system';
UPDATE category_mappings SET created_by = 'system', updated_by = 'system';
UPDATE gmail_credentials SET created_by = 'system', updated_by = 'system';
UPDATE gmail_import_logs SET created_by = 'system', updated_by = 'system';
