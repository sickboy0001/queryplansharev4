"use client";

import { SQLPlanCondition } from "@/constants/queryplanxml";
import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import GridDetail from "./GridDetail";
import { Switch } from "@/components/ui/switch";

interface propsType {
  rowData: any;
  key: number;
  detailData: any;
}

const GridRelOpRows = (props: propsType) => {
  const { rowData, key, detailData } = props;
  const [isRowVisible, setIsRowVisible] = useState(false);

  const handleToggleRowVisible = () => {
    setIsRowVisible(!isRowVisible);
  };

  return (
    <>
      <TableRow key={key}>
        {SQLPlanCondition.Disp.GridReplAttributes.map((attribute: any) => {
          return (
            <TableCell
              key={attribute.name}
              className={` {attributeName === "PhysicalOp"?"tabular-nums":""} border`}
            >
              <div className="flex items-center">
                {attribute.name === "PhysicalOp" ? (
                  <span className="font-mono font-bold">
                    {"--".repeat(rowData["level"])}
                    <span className="underline">{rowData[attribute.name]}</span>
                  </span>
                ) : (
                  rowData[attribute.name]
                )}

                {attribute.name === "PhysicalOp" ? (
                  <div className="px-2">
                    <Switch
                      id="SwitchVisible"
                      checked={isRowVisible}
                      onCheckedChange={handleToggleRowVisible}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </TableCell>
          );
        })}
      </TableRow>
      {isRowVisible && (
        <TableRow key={"GridDetail-row-" + key}>
          <TableCell
            colSpan={SQLPlanCondition.Disp.GridReplAttributes.length}
            className="p-1"
          >
            {detailData ? (
              <GridDetail data={detailData}></GridDetail>
            ) : (
              "nodate"
            )}
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default GridRelOpRows;
