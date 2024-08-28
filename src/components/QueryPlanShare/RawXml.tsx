"use client";

import React, { useEffect } from "react";
import CodeBlock from "../Atomic/CodeBlock";

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
