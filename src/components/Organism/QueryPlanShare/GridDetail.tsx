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

interface propsType {
  data: any[];
}
const GridDetail = (props: propsType) => {
  const { data } = props;
  // dataが配列でない場合、配列に変換
  // const dataArray = Array.isArray(data)
  const result = data.map((each: keyValue) => each.title).join("");
  function getDetailCell(title: string, xml: any): React.ReactNode {
    //title OutputList
    // console.log("getDetailCell.title:", title);
    const thissubinfos = SQLPlanCondition.Repl.Subinfos.filter(
      (each) => each.Id === title
    );
    if (thissubinfos.length !== 1) {
      console.log("thissubinfo.length:", thissubinfos.length);
      return "";
    }
    const thissubinfo = thissubinfos[0];

    console.log("thissubinfo:", thissubinfo);
    const thsisubinfototext: string[] = thissubinfo.ToText;
    if (thsisubinfototext.length === 0) {
      console.log("thsisubinfototext.length==0");
      return "";
    }

    let results: string[] = [];

    // thsisubinfototext
    //  ColumnReference--Database,Column
    //  SeekPredicateNew->SeekKeys->Prefix->RangeColumns->ColumnReference--Database,Schema,Table,Alias,Column",
    // condition:ColumnReference--Database
    thsisubinfototext.forEach((condition: string) => {
      if (condition.includes("--")) {
        const conditions = condition.split("--");
        // ColumnReference ノードをすべて取得
        // const thisxmls = xml.getElementsByTagName(conditions[0]);

        const thisxmls = Array.from(xml.querySelectorAll("*")).filter(
          (node) => (node as Element).tagName === conditions[0]
        );

        // 各 ColumnReference ノードの属性を取得
        Array.from(thisxmls).forEach((thisxml) => {
          const xmlElement = thisxml as Element; // 型アサーションを使用
          const nodenames = conditions[1].split(",");
          let xmlresults: string[] = [];
          nodenames.forEach((nodename) => {
            const thisvalue = xmlElement.getAttribute(nodename) || "";
            if (thisvalue.length !== 0) {
              xmlresults.push(thisvalue + ".");
            }
          });
          results.push(xmlresults.join(""));
        });
      } else {
        const nodenames = condition.split(",");
        let xmlresults: string[] = [];
        nodenames.forEach((nodename) => {
          const thisvalue = xml.getAttribute(nodename) || "";
          if (thisvalue.length !== 0) {
            xmlresults.push(thisvalue + ".");
          }
        });
        results.push(xmlresults.join(""));
      }
    });

    return (
      <>
        {results.map((each) => {
          {
            return <div>{each}</div>;
          }
        })}
      </>
    );
  }

  return (
    <>
      <Table>
        <TableBody>
          {data.map((each, index) => (
            <>
              <TableRow key={index}>
                <TableCell className="p-1">{each.title}</TableCell>
                <TableCell className="p-1">
                  {getDetailCell(each.title, each.xml)}
                </TableCell>
              </TableRow>
              <TableRow key={index}></TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default GridDetail;
