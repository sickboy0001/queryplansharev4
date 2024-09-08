"use client";

import React, { useEffect, useState } from "react";
import GridRelOpTable from "./GridRelOpTable";

interface propsType {
  xml: string;
}

const GridRelOp = (props: propsType) => {
  const { xml } = props;
  const [stmtSimples, setStmtSimples] = useState<Element[] | null>(null);
  useEffect(() => {
    const parser = new DOMParser();
    if (xml) {
      const dom = parser.parseFromString(xml, "text/xml");
      const thisstmtSimples = Array.from(
        dom.getElementsByTagName("StmtSimple")
      );
      // console.log(thisstmtSimples);
      setStmtSimples(thisstmtSimples);
    }
  }, [xml]);

  return (
    <>
      {stmtSimples
        ? stmtSimples.map((each, index) => (
            <GridRelOpTable key={index} stmtSimple={each}></GridRelOpTable>
          ))
        : ""}
    </>
  );
};

export default GridRelOp;
