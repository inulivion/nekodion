ALTER TABLE accounts
    ADD COLUMN initial_amount DECIMAL(15, 2) NOT NULL DEFAULT 0 AFTER account_name;
