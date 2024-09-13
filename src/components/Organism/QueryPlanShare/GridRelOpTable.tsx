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
} from "@/components/ui/table";
import { keyValue } from "@/types/common";
import GridDetail from "./GridDetail";
import { Collapsible } from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import GridRelOpRows from "./GridRelOpRows";

interface propsType {
  stmtSimple: Element;
}

const isElement = (obj: any): obj is Element => {
  return obj instanceof Element;
};

const getNodeId = (relop: Element | keyValue): string => {
  const result = isElement(relop)
    ? relop.getAttribute("NodeId")
    : relop["NodeId"];
  return result !== null ? result.toString() : "0";
};

const analyseReplSubinfo = (relop: Element, detailData: keyValue[]) => {
  SQLPlanCondition.Repl.Subinfos.map((each) => each.NodeCondition).map(
    (subinfoid) => {
      // console.log("subinfoid:", subinfoid);

      let subinfos: Element[] = [];

      // `->`で親子関係を表現する場合
      if (subinfoid.includes("->")) {
        const levels = subinfoid.split("->"); // 分割してレベルを取得

        // 最初のレベル（親）を検索
        let currentNodes = Array.from(relop.children);

        // 子や孫を順次検索
        for (let i = 1; i < levels.length; i++) {
          let nextNodes: Element[] = [];
          currentNodes.forEach((node) => {
            // 現在のノードの子要素のみを検索して次のレベルのノードを取得
            nextNodes.push(
              ...Array.from(node.children).filter(
                (child) => child.tagName === levels[i]
              )
            );
          });
          currentNodes = nextNodes; // 次のレベルのノードを現在のノードに設定
        }

        subinfos = currentNodes; // 最終的に見つかったノードを結果に追加
      } else {
        // 通常の検索
        // subinfos = Array.from(relop.querySelectorAll(subinfoid));
        subinfos = Array.from(relop.children).filter(
          (child) => child.tagName === subinfoid
        );
      }

      subinfos.map((subinfo) => {
        // console.log("subinfo:", subinfo);
        detailData.push({
          title: subinfo.tagName,
          xml: subinfo,
        });
      });
    }
  );
};

const analyseChildren = (
  level: number,
  children: Element[],
  Analyseds: keyValue[],
  detailDatas: keyValue
) => {
  Array.from(children).map((child) => {
    const relops = Array.from(child.children).filter(
      (each) => each.tagName === "RelOp"
    );

    Array.from(relops).map((relop) => {
      const analysedrelop: keyValue = [];

      // let log = "level:" + level.toString();
      analysedrelop["level"] = level;

      const nodeid: string = getNodeId(relop);
      detailDatas[nodeid] = [];

      analyseReplSubinfo(relop, detailDatas[nodeid]);

      SQLPlanCondition.Repl.Attributes.map((attributesName) => {
        // log = log + attributesName + ":" + relop.getAttribute(attributesName);
        analysedrelop[attributesName] = relop.getAttribute(attributesName);
      });
      Analyseds.push(analysedrelop);

      const child = Array.from(relop.children).filter((child) => {
        return SQLPlanCondition.Repl.Operation.includes(child.tagName);
      });
      analyseChildren(level + 1, child, Analyseds, detailDatas);
    });
  });
};

const GridRelOpTable = (props: propsType) => {
  const { stmtSimple } = props;
  const [analyseRelops, setAnalyseRelops] = useState<keyValue[]>([]);
  const [detailDatas, setDetailDatas] = useState<keyValue>({});

  useEffect(() => {
    const thisanalyseRelops: keyValue[] = [];
    const thisdetailDatas: keyValue[] = [];

    const children = stmtSimple.getElementsByTagName(
      SQLPlanCondition.QueryPlan
    );
    analyseChildren(
      0,
      Array.from(children),
      thisanalyseRelops,
      thisdetailDatas
    );
    setAnalyseRelops(thisanalyseRelops);
    setDetailDatas(thisdetailDatas);
  }, [stmtSimple]);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 border-b">
            {SQLPlanCondition.Disp.GridReplAttributes.map((element, key) => (
              <TableHead key={key} className="font-bold border">
                {element.displayname ? element.displayname : element.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from(analyseRelops).map((each, index) => (
            <GridRelOpRows
              detailData={detailDatas[getNodeId(each)]}
              rowData={each}
              key={index}
            ></GridRelOpRows>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default GridRelOpTable;
