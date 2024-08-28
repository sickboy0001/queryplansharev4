--テーブル作成
CREATE TABLE [users](
	[id] [char](10) COLLATE Japanese_BIN NOT NULL,
	[name] [nvarchar](64) COLLATE Japanese_BIN NULL,
	[postcode] [char](7) COLLATE Japanese_BIN NULL,
	[prefecture] [nvarchar](10)  COLLATE Japanese_BIN NULL,
 	[address] [nvarchar](max) COLLATE Japanese_BIN NULL
--クラスタ化インデックス追加
 CONSTRAINT [PK__users] PRIMARY KEY CLUSTERED
(
	[id] ASC
)
) ON [PRIMARY]
GO
