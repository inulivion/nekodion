-- gmail_credentialsのuser_idに外部キー制約を追加
ALTER TABLE gmail_credentials
    ADD CONSTRAINT fk_gmail_credentials_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
