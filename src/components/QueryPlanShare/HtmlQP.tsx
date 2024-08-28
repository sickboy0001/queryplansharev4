"use client";

import React, { useEffect, useState } from "react";
import { TypeQpsQueryPlan } from "@/app/types/QPS";
import { selectQpsQueryPlans } from "@/app/actions/Qps/QueryPlans";
import HtmlQueryPlan from "./HtmlQP";

interface propsType {
  qpsQueryPlan: TypeQpsQueryPlan | null | undefined;
  xml: string | null | undefined;
}

const HtmlQP = (props: propsType) => {
  const { qpsQueryPlan, xml } = props;
  const [QP, setQP] = useState<any>(null);
  //   const [qpsQueryPlan, setQpsQueryPlan] = useState<
  //     TypeQpsQueryPlan | undefined
  //   >(undefined);
  const [query, setQuery] = useState<string | null>("");
  useEffect(() => {
    // スクリプトを動的に読み込む
    const loadScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "/dist/js/qp/qp.js";
        script.type = "text/javascript";
        script.onload = () => resolve(window.QP);
        script.onerror = () => reject(new Error("Failed to load script"));
        document.head.appendChild(script);
      });
    };

    // スタイルシートも同様に読み込む
    const loadStylesheet = () => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = "/dist/css/qp/qp.css";
      document.head.appendChild(link);
    };

    loadStylesheet();
    loadScript()
      .then((QP) => {
        console.log(QP);
        setQP(QP);
      })
      .catch((error) => {
        console.error(error);
      });

    // クリーンアップ処理
    return () => {
      const script = document.querySelector(`script[src="/dist/js/qp/qp.js"]`);
      if (script) {
        document.head.removeChild(script);
      }
      const link = document.querySelector(`link[href="/dist/css/qp/qp.css"]`);
      if (link) {
        document.head.removeChild(link);
      }
    };
  }, []);

  useEffect(() => {
    if (xml !== undefined && xml !== null) {
      console.log("start useEffect");
      const container = document.getElementById("container");
      if (container && QP && typeof QP.showPlan === "function") {
        QP.showPlan(container, xml);
      } else {
        console.error("Container not found or QP is undefined or invalid.");
      }
    }
  }, [xml, QP]);

  return (
    <div className="grid w-full gap-2">
      {/* <div>{query ? <pre>{query}</pre> : ""}</div> */}
      <div id="container"></div>
      {/* {qpsQueryPlan ? (
        <HtmlQueryPlan xml={qpsQueryPlan.xml}></HtmlQueryPlan>
      ) : (
        ""
      )} */}
      {/* <div>{qpsQueryPlan ? <pre>{qpsQueryPlan.xml}</pre> : ""}</div> */}
    </div>
  );
};

export default HtmlQP;
