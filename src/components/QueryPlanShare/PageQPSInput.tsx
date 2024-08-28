"use client";
import React, { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { RegistQpsQueryPlans } from "@/app/actions/Qps/QueryPlans";
import { useRouter } from "next/navigation";
import { RegistQpsQueryPlansLinkedUrl } from "@/app/actions/Qps/QueryPlansLinkedUrl";

const PageQPSInput = () => {
  const [queryPlanXml, setQueryPlanXml] = useState<string>("");
  const [QP, setQP] = useState<any>(null);
  const [nextId, setNextId] = useState<number>(0);
  const [nextuuId, setNextuuId] = useState<string>("");

  const router = useRouter();

  const handleClick = () => {
    console.log("handleClick:regist data");
    console.log("--------------handleSubmit");

    const user_id = 0;
    const title = "";
    const xml = queryPlanXml;
    // console.log(xml);
    const fetch = async () => {
      const thisdata = await RegistQpsQueryPlans({
        params: {
          user_id: user_id,
          title: title,
          xml: xml,
        },
      });
      console.log("thisdata.id:", thisdata.id);
      const thisLinkedUrl = await RegistQpsQueryPlansLinkedUrl({
        params: {
          queryplans_id: thisdata.id,
        },
      });

      setNextId(thisdata.id);

      setNextuuId(thisLinkedUrl.uuid);

      console.log("thisLinkedUrl.uuid:", thisLinkedUrl.uuid);

      // router.push(`/nextPage/${thisdata.id}`);
      router.push(`/QueryPlanShare/view/?id=${thisdata.id}`);
      router.push(`/QueryPlanShare/view/?uuid=${thisLinkedUrl.uuid}`);
    };
    fetch();
  };

  // useEffect(() => {
  //   console.log("useEffect:", nextId);
  //   if (nextId !== 0) {
  //     console.log("nextId:", nextId);
  //     router.push(`/QueryPlanShare/view/?id=${nextId}`);
  //     window.location.reload(); // ページを再読み込みして最新のデータを取得する

  //     // <a href={`/QueryPlanShare/view/?id=${row.getValue("id")}`}>View</a>
  //   }
  // }, [nextId]);

  // テキストエリアの値が変更されたときに状態を更新
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setQueryPlanXml(event.target.value);
  };

  return (
    <div>
      <div className="grid w-full gap-2">
        PageQPSInput
        <Textarea
          rows={19}
          cols={60}
          placeholder="Type your message here."
          value={queryPlanXml} // テキストエリアの値を状態で管理
          onChange={handleTextareaChange} // 値が変更されたときに状態を更新
        />
      </div>

      <Button onClick={handleClick}>Regist</Button>
    </div>
  );
};

export default PageQPSInput;
