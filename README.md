# QueryPlanShare

SQLServer・SQLServerManagmentStudio（以下SSMS）で確認可能なQueryPlanは実際にクエリが期待通りのプランを用いて実行されているか、実行しよとしているかの判断や、実行結果の遅延がどこに依存するのかを把握するのに有効利用可能だと思います。SSMSでチャート化してみる分には期待し情報得ることは可能だと思います。
ただし、複数のQueryPlanを比較したり、詳細な数字を比較するのには見ていく上で非常にコストがかかる。
別のツールでQueryPlanを詳細に確認できたり、コストかかっている場所数値で確認できたりするツールないかなと思い作った次第。

## 簡単な説明

1. 確認したいクエリを取得
1. SSMSでクエリのプランを入手
    1. 推定プランの入手
    1. 実行プランの入手
1. このページで登録
1. URLを共有

***デモ***

![デモ](https://image-url.gif)


## 開発環境

- VSCode
- GitHub
- NextJS
- SQLExpress + SSMS

## デプロイ
- Vercel（予定）
- Supabase


## その他

- QueryPlanはある程度大きいものを想定しているため、古い（１か月想定）クエリプランは削除されます。
    - 原文のプラン保存しておくこと推奨です。
- アップロードされたクエリプランはURL指定すれば、だれでも参照可能なので、自己責任でアップロード対象のクエリプランを選択してください。
    - クエリ自体に個人情報など含まれている場合もあるので注意必要です、

## 作者

[@sickboy0001](https://twitter.com/sickboy0001)
mail to: syunjyu0001@gmail.com

## ライセンス

[MIT](http://TomoakiTANAKA.mit-license.org)</blockquote>