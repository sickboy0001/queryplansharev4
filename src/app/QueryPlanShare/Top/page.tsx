"use server";

import Start from "@/components/Organism/page/Start";
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
      <Start></Start>
      {/* </UserProvider> */}
    </>
  );
};

export default Page;
