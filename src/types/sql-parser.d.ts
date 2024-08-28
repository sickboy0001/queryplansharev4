declare module "node-sql-parser" {
  export class Parser {
    astify(query: string): AST;
  }

  export interface AST {
    from?: Array<{ table: string }>;
    // 他のプロパティの型定義も必要に応じて追加
  }
}
