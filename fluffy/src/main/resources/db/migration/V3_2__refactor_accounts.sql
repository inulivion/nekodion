-- 新口座種別を追加（FK制約のため先に追加）
INSERT INTO account_types (account_type, account_type_name, sort_order, version, created_at, updated_at)
VALUES
    ('CREDIT',        'クレカ口座',   2, 0, NOW(), NOW()),
    ('MANUAL',        '手動管理口座', 3, 0, NOW(), NOW()),
    ('UNCATEGORIZED', '未分類口座',   4, 0, NOW(), NOW());

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

-- 既存ユーザー全てに対し、一人一つの未分類口座を作成する
INSERT INTO accounts (user_id, account_type, account_name, closing_day, version, created_at, updated_at)
SELECT id, 'UNCATEGORIZED', '未分類', NULL, 0, NOW(), NOW()
FROM users;

-- 口座IDがNULLのレコードに対して、ユーザーに対する未分類口座に紐づけるようにする
UPDATE transactions t
    JOIN accounts a ON t.user_id = a.user_id AND a.account_type = 'UNCATEGORIZED'
SET t.account_id = a.id
WHERE t.account_id IS NULL;

-- 口座IDを NOT NULL 化
ALTER TABLE transactions
    MODIFY COLUMN account_id BIGINT NOT NULL COMMENT '口座ID';
