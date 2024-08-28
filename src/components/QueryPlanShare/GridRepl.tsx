"use client";

import { SQLPlanCondition } from "@/constants/queryplanxml";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface propsType {
  xml: string;
}

const analyseChildren = (
  level: number,
  children: Element[],
  Analyseds: AnalyseRelop[]
) => {
  Array.from(children).map((child) => {
    // const queryPlan = each.getElementsByTagName(tagqueryplan)[0];
    const relops = Array.from(child.children).filter(
      (each) => each.tagName === "RelOp"
    );
    // console.log(relops);
    Array.from(relops).map((relop) => {
      const analysedrelop: AnalyseRelop = [];
      let log = "level:" + level.toString();
      analysedrelop["level"] = level;
      SQLPlanCondition.Repl.Attributes.map((attributesName) => {
        log = log + attributesName + ":" + relop.getAttribute(attributesName);

        analysedrelop[attributesName] = relop.getAttribute(attributesName);
      });
      Analyseds.push(analysedrelop);

      // console.log(log);
      const child = Array.from(relop.children).filter((child) => {
        return SQLPlanCondition.Repl.Operation.includes(child.tagName);
      });
      analyseChildren(level + 1, child, Analyseds);
      // console.log("child:", child, "child[cnt]:", child.length);
    });
  });
};

interface AnalyseRelop {
  [key: string]: any; // 任意のプロパティ名で、型は `any` になります。具体的な型が分かる場合は `any` の代わりに指定します。
}

const GridRepl = (props: propsType) => {
  const { xml } = props;
  const [stmtSimples, setStmtSimples] = useState<Element[] | null>(null);
  const [analyseRelops, setAnalyseRelops] = useState<AnalyseRelop[]>([]);
  // // const analyseRelop:AnalyseRelop = {};
  // const analyseRelops: AnalyseRelop[] = [];
  useEffect(() => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(xml, "text/xml");
    const thisstmtSimples = Array.from(dom.getElementsByTagName("StmtSimple"));

    thisstmtSimples.forEach((each) => {
      const thisanalyseRelops: AnalyseRelop[] = [];
      const children = each.getElementsByTagName(SQLPlanCondition.QueryPlan);
      analyseChildren(1, Array.from(children), thisanalyseRelops);
      setAnalyseRelops(thisanalyseRelops);
      console.log(thisanalyseRelops);
    });
    setStmtSimples(thisstmtSimples);
  }, [xml]);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {SQLPlanCondition.Disp.GridReplAttributes.map((element, key) => (
              <TableHead key={key}>{element}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {stmtSimples ? (
          <TableBody>
            {Array.from(analyseRelops).map((each, index) => (
              <TableRow key={index}>
                {SQLPlanCondition.Disp.GridReplAttributes.map(
                  (attributeName: string) => {
                    return (
                      <TableCell
                        key={attributeName}
                        className={`{attributeName === "PhysicalOp"?"tabular-nums":""}`}
                      >
                        {attributeName === "PhysicalOp"
                          ? "--".repeat(each["level"])
                          : ""}
                        {each[attributeName]}
                      </TableCell>
                    );
                  }
                )}
              </TableRow>
            ))}
          </TableBody>
        ) : (
          ""
        )}
      </Table>
      {/* <div>{xml?.slice(0, 1000)}</div> */}
    </>
  );
};

export default GridRepl;
