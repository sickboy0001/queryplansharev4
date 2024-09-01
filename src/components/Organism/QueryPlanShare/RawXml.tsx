"use client";

import React, { useEffect } from "react";
import CodeBlock from "@/components/Atomic/CodeBlock";

interface propsType {
  xml: string;
}

const PageQPSView = (props: propsType) => {
  const { xml } = props;
  return (
    <div>
      <CodeBlock code={xml} language="xml" />
    </div>
  );
};

export default PageQPSView;
