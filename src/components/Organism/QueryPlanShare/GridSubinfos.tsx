"use client";

import { SQLPlanCondition } from "@/constants/queryplanxml";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { keyValue } from "@/types/common";
import CodeBlock from "@/components/Atomic/CodeBlock";

interface propsType {
  xml: string;
}

const GridSubinfos = (props: propsType) => {
  const { xml } = props;
  const [stmtSimples, setStmtSimples] = useState<HTMLCollection | null>(null);
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
        const subinfos = Array.from(queryPlan.children).filter(
          (each) => each.tagName === QueryPlanInfo.NodeName
        );

        let AttributionTable: any[] = [];

        let Header = QueryPlanInfo.Attributes;
        AttributionTable.push(Header);

        let rows: string[][] = [];

        QueryPlanInfo.Attributes?.map((Attribute) => {
          let cells: string[] = [];
          if (QueryPlanInfo.ListNodeName) {
            Array.from(subinfos).forEach((subinfo) => {
              const NodeNames = Array.from(subinfos).filter(
                (each) => each.tagName === QueryPlanInfo.NodeName
              );
              const ListNodeNames = Array.from(NodeNames).filter(
                (each) => each.tagName === QueryPlanInfo.ListNodeName
              );

              Array.from(ListNodeNames).forEach((subinfo) => {
                const attributeValue = subinfo.getAttribute(Attribute);
                cells.push(attributeValue as string);
              });
            });
            rows.push(cells);
            console.log("cells", cells);
          } else {
            Array.from(subinfos).forEach((subinfo) => {
              const attributeValue = subinfo.getAttribute(Attribute);
              cells.push(attributeValue as string);
            });
            rows.push(cells);
            // console.log("cells", cells);
          }
        });
        AttributionTable.push(rows);
        subInfoArray.push(AttributionTable);
        thisSubinfos.push(subInfoArray);
      });
    });
    setSubinfos(thisSubinfos);
    // console.log("thisSubinfos:", thisSubinfos);
    // setSubinfos;
  }, [xml]);

  return (
    <>
      {/* {subinfos}- {subinfos.length} */}
      {/* <CodeBlock code={subinfos} language="sql" /> */}
      <Table>
        <TableBody>
          {subinfos != null
            ? subinfos.map((subinfoArray, key) => (
                <TableRow>
                  <TableCell>{subinfoArray[0]}</TableCell>
                  <TableCell>
                    <Table>
                      <TableBody>
                        {subinfoArray[1]?.map(
                          (cells: string[], cellskey: string) => (
                            <TableRow key={cellskey}>
                              {cells?.map((cell, cellkey) => (
                                <TableCell key={cellkey}>
                                  {cell.toString()}
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
