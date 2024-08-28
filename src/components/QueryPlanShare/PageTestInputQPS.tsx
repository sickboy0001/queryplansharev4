"use client";
import React, { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const PageTestInputQPS = () => {
  const [queryPlanXml, setQueryPlanXml] = useState<string>("");
  const [QP, setQP] = useState<any>(null);

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

  const handleClick = () => {
    console.log("handleClick:start");
    const container = document.getElementById("container");
    console.log(QP);

    if (typeof QP !== "undefined") {
      QP.showPlan(container, queryPlanXml);
    }
  };
  // テキストエリアの値が変更されたときに状態を更新
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setQueryPlanXml(event.target.value);
  };

  return (
    <div className="grid w-full gap-2">
      <Textarea
        rows={19}
        cols={60}
        placeholder="Type your message here."
        value={queryPlanXml} // テキストエリアの値を状態で管理
        onChange={handleTextareaChange} // 値が変更されたときに状態を更新
      />

      <Button onClick={handleClick}>Send message</Button>

      <div id="container"></div>
    </div>
  );
};

export default PageTestInputQPS;
