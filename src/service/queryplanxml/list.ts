import { TypeQpsQueryPlanListView } from "@/app/types/QPS";
import { Parser } from "node-sql-parser";
export interface TypeDetailQueryPlan extends TypeQpsQueryPlanListView {
  //列の追加
  //クエリ、テーブル名
  query: string; // クエリ
  tableNames: string[]; // テーブル名
}

export const getDetailQueryPlan = (
  plans: TypeQpsQueryPlanListView[]
): TypeDetailQueryPlan[] => {
  return plans.map((plan) => ({
    ...plan,
    query: getQueryFromXml(plan.xml), // ここで実際のクエリを設定する
    tableNames: getTablesFromQuery(plan.xml), // ここで実際のテーブル名を設定する
  }));
};

export const getQueryFromXml = (xml: string): string => {
  //   return "your_query_here";
  const parser = new DOMParser();
  const dom = parser.parseFromString(xml, "text/xml");
  const stmtSimple = dom.getElementsByTagName("StmtSimple")[0];
  // console.log(query.getAttribute("StatementText"));
  const thisQuery = stmtSimple.getAttribute("StatementText") as string;

  return thisQuery;
};

export const getTablesFromQuery = (xml: string): string[] => {
  const query = getQueryFromXml(xml);
  const parser = new Parser();
  // const parsed = parser.parse(query);
  let ast;
  try {
    ast = parser.astify(query); // クエリをパースして AST を取得
  } catch (error) {
    console.error("Error parsing SQL query:", error);
    return [];
  }
  // テーブル名を抽出するロジックを実装
  // 例: `parsed` オブジェクトからテーブル名を抽出
  const tableNames: string[] = [];

  const from = ast.from;

  from?.forEach((item: any) => {
    if (item && item.table) {
      tableNames.push(item.table);
    }
  });

  return tableNames;
};
