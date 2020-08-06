# times

## permissions

- app_mentions:read
- channels:history
- channels:manage
- chat:write
- chat:write.customize
- groups:history
- groups:write
- users.profile:read

## 開発時の起動方法

.env に環境変数を書く。

```
SLACK_SIGNING_SECRET=xxxxxxxxx
SLACK_BOT_TOKEN=xoxb-xxxxxxxxxx
SLACK_CHANNEL=C017VEWKT7Z
```

`yarn dev` で起動。

## App 登録

- https://api.slack.com/apps で作る
- App Credentials の Signing Secret を `SLACK_SIGNING_SECRET` 環境変数に入れる
- Bot Token を得る
  - OAuth & Permissions で適当な scope を選んで Install App to Workspace
  - Bot User OAuth Access Token を `SLACK_BOT_TOKEN` 環境変数に入れる
- `yarn dev` で起動
- Event Subscriptions
