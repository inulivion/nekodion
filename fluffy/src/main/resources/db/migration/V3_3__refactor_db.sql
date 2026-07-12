-- 口座種別は1.銀行口座(BANK) 2.クレカ口座(CREDIT) 3.手動管理口座(MANUAL) 4. 未分類口座(UNCATEGORIZED)に変更

-- 新口座種別を追加（FK制約のため先に追加）
INSERT INTO account_types (account_type, account_type_name, sort_order, version, created_at, created_by, updated_at, updated_by)
VALUES
    ('CREDIT',        'クレカ口座',   2, 0, NOW(), 'system', NOW(), 'system'),
    ('MANUAL',        '手動管理口座', 3, 0, NOW(), 'system', NOW(), 'system'),
    ('UNCATEGORIZED', '未分類口座',   4, 0, NOW(), 'system', NOW(), 'system');

-- BANK の表示名を更新
UPDATE account_types SET account_type_name = '銀行口座' WHERE account_type = 'BANK';

-- データの整合性をとる（account_templates と accounts のFK参照を更新）
UPDATE account_templates SET account_type = 'CREDIT' WHERE account_type = 'CARD';
UPDATE account_templates SET account_type = 'MANUAL'  WHERE account_type = 'CASH';

UPDATE accounts SET account_type = 'CREDIT'        WHERE account_type = 'CARD';
UPDATE accounts SET account_type = 'MANUAL'         WHERE account_type = 'CASH';
UPDATE accounts SET account_type = 'UNCATEGORIZED'  WHERE account_type = 'OTHER';

-- 旧口座種別を削除
DELETE FROM account_types WHERE account_type IN ('CARD', 'CASH', 'OTHER');

-- 口座に締日カラムを追加（NULL許容）
ALTER TABLE accounts
    ADD COLUMN closing_day INT NULL COMMENT '締日' AFTER account_name;

-- 口座から初期残高カラムを削除
ALTER TABLE accounts
    DROP COLUMN initial_amount;

-- 既存ユーザー全てに対し、一人一つの未分類口座を作成する
INSERT INTO accounts (user_id, account_type, account_name, closing_day, version, created_at, created_by, updated_at, updated_by)
SELECT id, 'UNCATEGORIZED', '未分類', NULL, 0, NOW(), 'system', NOW(), 'system'
FROM users;
