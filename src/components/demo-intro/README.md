# 卸見積紹介（型B）

設計の正本：`axeon_demo_selection/docs/impl/wholesale-quote-intro-design.md`

- 見せ切る操作：問い合わせを開く → 在庫表 → 人が返す
- 掲載：`/?embed=intro` のみ。`/desk` と `/lp` には出さない
- 再生中に API・保存・送信は走らせない
