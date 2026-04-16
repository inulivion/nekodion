CREATE TABLE users
(
    id          CHAR(36)        PRIMARY KEY,
    auth0_id    VARCHAR(128)    NOT NULL UNIQUE,
    email       VARCHAR(255)    NOT NULL UNIQUE,

    version     INT      NOT NULL,
    created_at  DATETIME NOT NULL,
    updated_at  DATETIME NOT NULL
) COMMENT = '[TRANSACTION] ユーザー'
;
