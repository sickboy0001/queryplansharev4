"use client";
import React, { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css"; // Okaidiaテーマを使用
import "prismjs/components/prism-sql";
import "prismjs/components/prism-xml-doc";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const codeRef = useRef<HTMLElement | null>(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    //typeof window !== "undefined" &&
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);
  const copyToClipboard = async () => {
    if (codeRef.current) {
      const text = codeRef.current.textContent || "";
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // 2秒後にコピー状態をリセット
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  };

  return (
    <>
      <pre className={`language-${language}`} suppressHydrationWarning>
        <code
          ref={codeRef}
          className={`language-${language} line-numbers`}
          suppressHydrationWarning
          data-prismjs-copy="Copy "
        >
          {code}
        </code>
      </pre>
    </>
  );
};

export default CodeBlock;
