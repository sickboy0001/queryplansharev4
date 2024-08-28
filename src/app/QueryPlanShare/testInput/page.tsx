"use server";
import PageTest1QPS from "@/components/QueryPlanShare/PageTest1QPS";
import PageTestInputQPS from "@/components/QueryPlanShare/PageTestInputQPS";
import React from "react";

// import { getUtilUser } from "@/app/actions/user/utilUser";
// import { UserProvider } from "@/components/user/UserContext";
// import { User } from "@/app/types/user";
// import PageList from "@/components/zstpost/pageTitles/PageList";
const Page = async () => {
  // console.log(searchParams);

  // searchParams.basedateの取得
  //   const user = await getUtilUser();

  return (
    <>
      {/* <UserProvider user={user as User}> */}
      <PageTestInputQPS></PageTestInputQPS>
      {/* </UserProvider> */}
    </>
  );
};

export default Page;
