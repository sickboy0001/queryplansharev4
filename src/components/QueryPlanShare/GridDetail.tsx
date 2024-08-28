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
} from "../ui/table";

interface propsType {
  xml: string;
}

const GridDetail = (props: propsType) => {
  const { xml } = props;
  const [stmtSimples, setStmtSimples] = useState<HTMLCollection | null>(null);

  useEffect(() => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(xml, "text/xml");
    const thisstmtSimples = dom.getElementsByTagName("StmtSimple");

    Array.from(thisstmtSimples).forEach((each) => {
      const queryPlan = each.getElementsByTagName("QueryPlan")[0];
      const child = Array.from(queryPlan.children).filter(
        (child) => child.tagName === "RelOp"
      );
      Array.from(child).map((relop) => {
        console.log(relop.getAttribute("LogicalOp"));
      });
    });

    setStmtSimples(thisstmtSimples);
  }, [xml]);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {SQLPlanCondition.Disp.GridStatementsAttributes.map(
              (element, key) => (
                <TableHead key={key}>{element}</TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        {stmtSimples ? (
          <TableBody>
            {Array.from(stmtSimples).map((each, index) => (
              <TableRow key={index}>
                {SQLPlanCondition.Disp.GridStatementsAttributes.map(
                  (element) => (
                    <TableCell key={element}>
                      {each.getAttribute(element)}
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        ) : (
          ""
        )}
      </Table>
    </>
  );
};

export default GridDetail;
