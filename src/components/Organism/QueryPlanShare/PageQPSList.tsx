"use client";
import React, { useEffect, useState } from "react";
import { columns } from "./ListColumnDetailQueryPlan";
import { ListDataTable } from "./ListDataTable";
import {
  getDetailQueryPlan,
  TypeDetailQueryPlan,
} from "@/service/queryplanxml/list";
import { selectAllQpsQueryPlansListView } from "@/app/actions/Qps/QueryPlansListView";

const PageQPSList = () => {
  const [DetailQueryPlan, setDetailQueryPlan] = useState<TypeDetailQueryPlan[]>(
    []
  );

  useEffect(() => {
    const fetch = async () => {
      const thisData = await selectAllQpsQueryPlansListView();
      const thisDetailQueryPlan = getDetailQueryPlan(thisData);

      // thisDetailQueryPlan.map((each) => {
      //   console.log(each.title);
      //   console.log(each.uuid);
      // });
      setDetailQueryPlan(thisDetailQueryPlan);
    };
    fetch();
  }, []);
  return (
    <div className="grid w-full gap-2">
      <ListDataTable columns={columns} data={DetailQueryPlan} />
    </div>
  );
};

export default PageQPSList;
