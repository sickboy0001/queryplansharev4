"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { CopyIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";

const TextUrl = () => {
  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(window.location.href);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        alert("クリップボードにコピーしました！");
      })
      .catch((err) => {
        console.error("コピーに失敗しました: ", err);
      });
  };

  return (
    <>
      <div className="flex px-4 py-2">
        <Input className="mx-1" id="fullUrl" value={fullUrl} readOnly />
        <Button variant="outline" size="icon" onClick={handleCopy}>
          <CopyIcon className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export default TextUrl;
