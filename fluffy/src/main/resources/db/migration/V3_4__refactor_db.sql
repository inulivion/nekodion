-- 取引方向カラムを追加（入金、出金）- 先に追加して既存データを設定してから NOT NULL 化
ALTER TABLE transactions
    ADD COLUMN direction VARCHAR(3) NULL COMMENT '取引方向（IN: 入金, OUT: 出金）' AFTER transaction_type;

UPDATE transactions SET direction = 'IN'  WHERE transaction_type IN ('INCOME', 'TRANSFER_IN');
UPDATE transactions SET direction = 'OUT' WHERE transaction_type IN ('EXPENSE', 'TRANSFER_OUT');

-- 取引種別テーブルを削除し、取引テーブルに取引種別を追加（通常、振替、帳尻）

-- transactions.transaction_type の FK を動的に削除
SET @fk_name = (
    SELECT CONSTRAINT_NAME
    FROM information_schema.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'transactions'
      AND REFERENCED_TABLE_NAME = 'transaction_types'
    LIMIT 1
);
SET @sql = CONCAT('ALTER TABLE transactions DROP FOREIGN KEY ', @fk_name);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- transaction_type の値 CHECK 制約を動的に削除
SET @chk_name = (
    SELECT cc.CONSTRAINT_NAME
    FROM information_schema.CHECK_CONSTRAINTS cc
    JOIN information_schema.TABLE_CONSTRAINTS tc
        ON cc.CONSTRAINT_SCHEMA = tc.CONSTRAINT_SCHEMA
       AND cc.CONSTRAINT_NAME   = tc.CONSTRAINT_NAME
    WHERE cc.CONSTRAINT_SCHEMA = DATABASE()
      AND tc.TABLE_NAME = 'transactions'
      AND cc.CHECK_CLAUSE LIKE '%TRANSFER%'
    LIMIT 1
);
SET @sql2 = CONCAT('ALTER TABLE transactions DROP CHECK ', @chk_name);
PREPARE stmt2 FROM @sql2;
EXECUTE stmt2;
DEALLOCATE PREPARE stmt2;

-- 既存データの transaction_type を新しい値に更新
UPDATE transactions SET transaction_type = 'NORMAL'   WHERE transaction_type IN ('INCOME', 'EXPENSE');
UPDATE transactions SET transaction_type = 'TRANSFER' WHERE transaction_type IN ('TRANSFER_IN', 'TRANSFER_OUT');

-- 取引種別テーブルを削除
DROP TABLE transaction_types;

-- transaction_type に新 CHECK 制約を追加
ALTER TABLE transactions
    ADD CONSTRAINT chk_transaction_type CHECK (transaction_type IN ('NORMAL', 'TRANSFER', 'ADJUSTMENT'));

-- direction を NOT NULL 化し CHECK 制約を追加
ALTER TABLE transactions
    MODIFY COLUMN direction VARCHAR(3) NOT NULL COMMENT '取引方向（IN: 入金, OUT: 出金）',
    ADD CONSTRAINT chk_direction CHECK (direction IN ('IN', 'OUT'));

-- 取引に削除可能フラグを追加
ALTER TABLE transactions
    ADD COLUMN is_deletable BOOLEAN NOT NULL DEFAULT TRUE COMMENT '削除可能フラグ' AFTER is_read;

-- 口座IDがNULLのレコードに対して、ユーザーに対する未分類口座に紐づけるようにする
UPDATE transactions t
    JOIN accounts a ON t.user_id = a.user_id AND a.account_type = 'UNCATEGORIZED'
SET t.account_id = a.id
WHERE t.account_id IS NULL;

-- 口座IDを NOT NULL 化
ALTER TABLE transactions
    MODIFY COLUMN account_id BIGINT NOT NULL COMMENT '口座ID';

-- 既読フラグにコメントをつける
ALTER TABLE transactions
    MODIFY COLUMN is_read BOOLEAN NOT NULL DEFAULT TRUE COMMENT '既読フラグ';

-- コメント修正
ALTER TABLE transactions
    MODIFY COLUMN transaction_name VARCHAR(255) NOT NULL COMMENT '取引名';
