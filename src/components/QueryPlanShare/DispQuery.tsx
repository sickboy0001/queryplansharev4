"use client";

import React, { useEffect, useState } from "react";
import { TypeQpsQueryPlan } from "@/app/types/QPS";
import CodeBlock from "../Atomic/CodeBlock";

interface propsType {
  // qpsQueryPlan: TypeQpsQueryPlan | null | undefined;
  query: string | null | undefined;
}

const PageQPSView = (props: propsType) => {
  const { query } = props;

  return <div>{query ? <CodeBlock code={query} language="sql" /> : ""}</div>;
};

export default PageQPSView;
