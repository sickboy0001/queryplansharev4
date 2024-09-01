"use client";

import React, { useEffect, useRef, useState } from "react";
import { TypeQpsQueryPlan } from "@/app/types/QPS";

interface propsType {
  xml: string | null | undefined;
}

const HtmlQP = (props: propsType) => {
  const { xml } = props;
  const [QP, setQP] = useState<any>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // スクリプトを動的に読み込む
    const loadScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "/dist/js/qp/qp.js";
        script.type = "text/javascript";
        script.onload = () => {
          console.log("Script loaded successfully.");
          const checkQP = () => {
            if (window.QP) {
              console.log("QP is available:", window.QP);
              resolve(window.QP);
            } else {
              console.log("QP is not available yet, retrying...");
              setTimeout(checkQP, 200); // 100ms後に再試行
            }
          };
          checkQP();
        };
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
    if (xml && QP && ref.current) {
      try {
        QP.showPlan(ref.current, xml);
      } catch (error) {
        console.error("Error calling QP.showPlan:", error);
      }
    } else {
      if (!ref.current) {
        console.error("Container not found.");
      }
      if (!QP) {
        // console.error("QP is undefined or invalid.");
      }
    }
  }, [xml, QP]);

  return (
    <div className="grid w-full gap-2">
      {/* <div>{query ? <pre>{query}</pre> : ""}</div> */}
      <div ref={ref} id="plan-container"></div>
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
