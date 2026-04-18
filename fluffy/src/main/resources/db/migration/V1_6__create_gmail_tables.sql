CREATE TABLE gmail_credentials
(
    user_id              CHAR(36) NOT NULL,
    access_token         TEXT,
    refresh_token        TEXT,
    expiration_time_ms   BIGINT,

    version     INT      NOT NULL,
    created_at  DATETIME NOT NULL,
    updated_at  DATETIME NOT NULL,

    PRIMARY KEY (user_id)
) COMMENT = 'Gmail OAuth tokens per user';
