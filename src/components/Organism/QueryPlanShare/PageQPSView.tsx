"use client";

import React, { useEffect, useState } from "react";
import { TypeQpsQueryPlan } from "@/app/types/QPS";
import { selectQpsQueryPlans } from "@/app/actions/Qps/QueryPlans";
import HtmlQueryPlan from "./HtmlQP";
import DispQuery from "./DispQuery";
import RawXml from "./RawXml";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getQueryFromXml } from "@/service/queryplanxml/list";
import GridStmtSimple from "./GridStmtSimple";
import GridRelOp from "./GridRelOp";
import { Input } from "@/components/ui/input";
import TextUrl from "./TextUrl";
import GridSubinfos from "./GridSubinfos";

interface propsType {
  id: number;
}

const PageQPSView = (props: propsType) => {
  const { id } = props;
  // const [QP, setQP] = useState<any>(null);
  const [qpsQueryPlan, setQpsQueryPlan] = useState<
    TypeQpsQueryPlan | undefined
  >(undefined);
  const [query, setQuery] = useState<string | null>("");

  useEffect(() => {
    const fetch = async () => {
      const thisdata = await selectQpsQueryPlans(id);
      setQpsQueryPlan(thisdata);
      const thisQuery = getQueryFromXml(thisdata.xml);
      setQuery(thisQuery);
    };
    fetch();
  }, [id]);

  return (
    <div className="grid w-full gap-2">
      <Accordion type="single" defaultValue="item-TextUrl" collapsible>
        <AccordionItem value="item-TextUrl">
          <AccordionTrigger>Url</AccordionTrigger>
          <AccordionContent>
            <TextUrl></TextUrl>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Xml</AccordionTrigger>
          <AccordionContent>
            <RawXml xml={qpsQueryPlan?.xml || ""}></RawXml>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" defaultValue="Query" collapsible>
        <AccordionItem value="Query">
          <AccordionTrigger>Query</AccordionTrigger>
          <AccordionContent>
            <DispQuery query={query}></DispQuery>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" defaultValue="Plan" collapsible>
        <AccordionItem value="Plan">
          <AccordionTrigger>Plan</AccordionTrigger>
          <AccordionContent>
            <HtmlQueryPlan
              xml={qpsQueryPlan?.xml || ""}
              // qpsQueryPlan={qpsQueryPlan}
            ></HtmlQueryPlan>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" defaultValue="DetailGrid" collapsible>
        <AccordionItem value="DetailGrid">
          <AccordionTrigger>Detail</AccordionTrigger>
          <AccordionContent>
            <GridStmtSimple xml={qpsQueryPlan?.xml || ""}></GridStmtSimple>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" defaultValue="Subinfo" collapsible>
        <AccordionItem value="Subinfo">
          <AccordionTrigger>Subinfo</AccordionTrigger>
          <AccordionContent>
            <GridSubinfos xml={qpsQueryPlan?.xml || ""}></GridSubinfos>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" defaultValue="ReplGrid" collapsible>
        <AccordionItem value="ReplGrid">
          <AccordionTrigger>Repl</AccordionTrigger>
          <AccordionContent>
            <GridRelOp xml={qpsQueryPlan?.xml || ""}></GridRelOp>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PageQPSView;
