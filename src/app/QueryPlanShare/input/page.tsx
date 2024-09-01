"use server";
import PageQPSInput from "@/components/Organism/QueryPlanShare/PageQPSInput";
import React from "react";

const Page = async () => {
  // console.log(searchParams);

  // searchParams.basedateの取得
  //   const user = await getUtilUser();

  return (
    <>
      {/* <UserProvider user={user as User}> */}
      <PageQPSInput></PageQPSInput>
      {/* </UserProvider> */}
    </>
  );
};

export default Page;
