"use server";
import { selectQpsQueryPlansLinkedUrl } from "@/app/actions/Qps/QueryPlansLinkedUrl";
import PageQPSView from "@/components/Organism/QueryPlanShare/PageQPSView";
import React from "react";

interface propsType {
  searchParams:
    | {
        [key: string]: string | string[] | undefined | any;
      }
    | any;
}

const Page = async ({ searchParams }: propsType) => {
  let id = String(searchParams.id || "0");
  let uuid = String(searchParams.uuid || "");

  if (id === "0") {
    const thisdata = await selectQpsQueryPlansLinkedUrl(uuid);
    console.log(thisdata);
    id = String(thisdata.queryplans_id);
  }
  return (
    <>
      {/* <UserProvider user={user as User}> */}
      <PageQPSView id={Number(id)}></PageQPSView>
      {/* </UserProvider> */}
    </>
  );
};

export default Page;
