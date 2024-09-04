# QueryPlanShare

SQLServer(およびSQLServerManagmentStudio（以下SSMS）)上で提供されているQueryPlanは実際にクエリが期待通りのプランを用いて実行されているか、実行しよとしているかの判断や、実行結果の遅延がどこに依存するのかを把握するのに有効利用可能だと思います。SSMSでチャート化してみる分には期待し情報得ることは可能だと思います。 ただし、複数のQueryPlanを比較したり、詳細な数字を比較するのには見ていく上で非常にコストがかかる。 簡単にQueryPlanを詳細に確認できたり、コストかかっている場所数値で確認できたりするツールないかなという思いで作成したツールです。

## 簡単な説明

1. 確認したいクエリを取得
1. SSMSでクエリのプランを入手
    1. 推定プランの入手
    1. 実行プランの入手
1. このページで登録
1. 可視化された、QueryPlanを確認
1. URLを必要に応じて保存、共有

***デモ***

![デモ](https://image-url.gif)


## 開発環境

- [VSCode (Visual Studio Code)](https://code.visualstudio.com/)
- [GitHub](https://github.com/)
- [Next.js](https://nextjs.org/)
- [Shadcn/UI](https://ui.shadcn.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [HtmlQueryPlan](https://github.com/JustinPealing/html-query-plan)


## SQLServer
- SQL Server Express + SSMS (SQL Server Management Studio):
    - [SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
    - [SSMS](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms)

## デプロイ
- Vercel（予定）
- Supabase


## その他

- QueryPlanはある程度大きいものを想定しているため、古い（１か月想定）クエリプランは削除されます。
    - 原文のプラン保存しておくこと推奨です。
- アップロードされたクエリプランはURL指定すれば、だれでも参照可能なので、自己責任でアップロード対象のクエリプランを選択してください。
    - クエリ自体に個人情報など含まれている場合もあるので注意必要です、

## 今後
- ログイン機能作成して、ログイン者毎に登録したQueryPlanを一覧確認できて、利用できるようにする？
    - その場合保存期間１か月も見直すことは可能かと
- 各QueryPlanにコメントつけれるようにする？

## 作者

[@sickboy0001](https://twitter.com/sickboy0001)
mail to: syunjyu0001@gmail.com

## ライセンス

[MIT](http://TomoakiTANAKA.mit-license.org)</blockquote>