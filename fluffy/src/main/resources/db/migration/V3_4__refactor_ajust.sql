-- 口座のinitial_amountを取引に反映する。取引種別はADJUSTMENTとする。
-- カテゴリーはマスタの「未分類」（収入側 id=8 / 支出側 id=74。V2_2__insert_categories.sql参照）を使用する。
INSERT INTO transactions (
    id, user_id, account_id, transaction_type, direction, transaction_name,
    amount, transaction_at, description, category_id, is_aggregated, is_confirmed,
    is_read, is_deletable, version, created_at, updated_at
)
SELECT
    (SELECT COALESCE(MAX(id), 0) FROM transactions) + ROW_NUMBER() OVER (ORDER BY a.id),
    a.user_id,
    a.id,
    'ADJUSTMENT',
    CASE WHEN a.initial_amount >= 0 THEN 'IN' ELSE 'OUT' END,
    '初期残高',
    ABS(a.initial_amount),
    a.created_at,
    NULL,
    CASE WHEN a.initial_amount >= 0 THEN 8 ELSE 74 END,
    FALSE,
    TRUE,
    TRUE,
    FALSE,
    0,
    NOW(),
    NOW()
FROM accounts a
WHERE a.initial_amount <> 0;

-- 口座のinitial_amountを削除する。
ALTER TABLE accounts
    DROP COLUMN initial_amount;
