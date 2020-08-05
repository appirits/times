# times

## permissions

- channels:history
- chat:write
- chat:write.customize
- groups:history
- users.profile:read

## 開発時の起動方法

.env に環境変数を書く。

```
SLACK_SIGNING_SECRET=xxxxxxxxx
SLACK_BOT_TOKEN=xoxb-xxxxxxxxxx
SLACK_CHANNEL=C017VEWKT7Z
```

`yarn dev` で起動。
