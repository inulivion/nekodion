# データベース設計

- flywayで管理する
- 日本時刻
- UTF-8
- flywayの実行はdockerで行う

```
fluffy
├─ src/main/resources/db/migration
│  ├─ V1_1__xxx.sql
│  ├─ V2_1__xxx.sql
│  ├─ V2_2__xxx.sql
├─ build.gradle
├─ Dockerfile
└─ settings.gradle
```
