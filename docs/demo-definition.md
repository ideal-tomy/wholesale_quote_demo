# Demo Definition（wholesale-quote）

作成日：2026-09-22  
テンプレート：AI-Demo-Studio/docs/ai_demo_standard_definition_template.md

## 1. Demo Identity

- Demo ID: `wholesale-quote`
- Demo Name: 卸｜型番の問い合わせから見積下書き
- Repository: `wholesale_quote_demo`
- Demo Type: Workflow（Inbox） + Dashboard chrome

## 1.2 対象ユーザー

- Primary User: 卸の営業・受注担当（画面上）
- Secondary User: 決裁者（閲覧の中心）
- 利用シーン: 届いた型番・在庫の問い合わせに返す

## 2. Demo Goal

問い合わせを開くと確認結果と返信下書きが並び、根拠の表まで進んでから担当者が返すことを体験してもらう。

体験終了時: 「探す先がその画面になり、返す内容は人が決める」

最重要価値: 分かりやすさ、実務感、導入後の想像しやすさ

## 3. Common Core Integration

初回は代表3手をスクリプトで完走させる。UIから Provider を直叩きしない。  
`@axeon/ai-demo-core` / Trial / ROI は後段。体験コード取得はデモに複製しない。

Access Mode: サンプル固定。APIキーなしで3手完走。

## 4. シナリオ

1. `/desk` で在庫確認の1件が開いている
2. 在庫表を開き、該当行の数字を見る
3. 下書きのまま返すか、直して返す

右ドロワーは任意。チップで追加確認する。

## 5. 受け入れ

- 自動送信しない
- 価格を自動確定しない
- 根拠へ進める
- `/lp` から机へ戻れる
