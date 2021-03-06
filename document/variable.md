## 環境変数

### `PORT`
サーバーを起動するポート番号です。
指定されていない場合は 8050 が使用されます。

Heroku にデプロイする場合は、Heroku がこの環境変数を適切なものにあらかじめ設定します。
そのため、Heroku の環境変数の設定画面で設定する必要はありません。

### `DB_URI`
MongoDB の URI です。

### `COOKIE_SECRET`
署名付き Cookie を生成する際に用いるシークレットキーです。
適当なランダム文字列を指定してください。
指定されていない場合は `cookie-zpdic` が用いられますが、シークレットキーが流出するのはセキュリティ的に良くないので、必ず指定してください。

### `JWT_SECRET`
JSON Web Token を生成する際に用いるシークレットキーです。
適当なランダム文字列を指定してください。
指定されていない場合は `jwt-secret` が用いられますが、シークレットキーが流出するのはセキュリティ的に良くないので、必ず指定してください。

### `SENDGRID_KEY`
Sendgrid の API キーです。

### `RECAPTCHA_SECRET`
reCAPTCHA v3 のシークレットキーです。
フロントエンド側で用いられるサイトキーに対応するものを指定してください。