"use client";

import { SQLPlanCondition } from "@/constants/queryplanxml";
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface propsType {
  xml: string;
}

const getRowAttributes = (info: Element, Attributes: string[]) => {
  //Attributeの各列でのMap
  const cells: string[] = [];
  Attributes?.map((Attribute) => {
    const attributeValue = info.getAttribute(Attribute);
    cells.push(attributeValue as string);
  });
  return cells;
};

const getSubInfotable = (
  subinfos: Element[],
  Attributes: string[],
  listNodeName: string
) => {
  let SubInfotable: any[] = [];
  //Header分の追加
  let Header = Attributes;
  SubInfotable.push(Header);
  //Attributeから情報の取得

  let rows: string[][] = [];
  //Data分の追加

  console.log("listNodeName", listNodeName);

  let infos = !listNodeName
    ? subinfos
    : subinfos.flatMap((info) =>
        Array.from(info.getElementsByTagName(listNodeName))
      ); // 指定されたノード名に一致する要素を取得
  Array.from(infos).forEach((info) => {
    // console.log("cells", cells);
    const cells = getRowAttributes(info, Attributes);
    SubInfotable.push(cells);
  });

  // SubInfotable.push(rows);
  console.log("SubInfotable", SubInfotable);
  return SubInfotable;
};

const GridSubinfos = (props: propsType) => {
  const { xml } = props;
  const [subinfos, setSubinfos] = useState<any[] | null>([]);

  useEffect(() => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(xml, "text/xml");
    const thisstmtSimples = dom.getElementsByTagName("StmtSimple");
    const thisSubinfos: any[] = [];

    Array.from(thisstmtSimples).forEach((each) => {
      const queryPlan = each.getElementsByTagName("QueryPlan")[0];
      SQLPlanCondition.QueryPlanInfos.map((QueryPlanInfo) => {
        let subInfoArray: any[] = [];
        subInfoArray.push(QueryPlanInfo.NodeName);

        //分析対象の取得
        const subinfos = Array.from(queryPlan.children).filter(
          (each) => each.tagName === QueryPlanInfo.NodeName
        );

        const thisgetAttributeTable = getSubInfotable(
          subinfos,
          QueryPlanInfo.Attributes,
          QueryPlanInfo.ListNodeName || ""
        );

        subInfoArray.push(thisgetAttributeTable);
        thisSubinfos.push(subInfoArray);
      });
    });
    setSubinfos(thisSubinfos);
  }, [xml]);

  return (
    <>
      <Table>
        <TableBody>
          {subinfos != null
            ? subinfos.map((subinfoArray, key) => (
                <TableRow>
                  <TableCell>{subinfoArray[0]}</TableCell>
                  <TableCell>
                    <Table className=" border border-gray-300">
                      <TableBody>
                        {subinfoArray[1]?.map(
                          (cells: string[], cellskey: string) => (
                            <TableRow key={cellskey}>
                              {cells?.map((cell, cellkey) => (
                                <TableCell className="border" key={cellkey}>
                                  {cell ? cell.toString() : "-"}
                                </TableCell>
                              ))}
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              ))
            : ""}
        </TableBody>
      </Table>
      {/* <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            {SQLPlanCondition.Disp.GridStatementsAttributes.map(
              (element, key) => (
                <TableHead key={key} className="font-bold">
                  {element.displayname ? element.displayname : element.name}
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        {stmtSimples ? (
          <TableBody>
            {=> (
              <TableRow key={index}>
                {SQLPlanCondition.Disp.GridStatementsAttributes.map(
                  (element) => (
                    <TableCell key={element.name}>
                      {each.getAttribute(element.name)}
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        ) : (
          ""
        )}
      </Table> */}
    </>
  );
};

export default GridSubinfos;
