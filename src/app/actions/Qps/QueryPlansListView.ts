"use server";

import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";

export async function selectAllQpsQueryPlansListView() {
  const supabase = createClient();
  const { data: res, error } = await supabase
    .from("qps_queryplans_list_view")
    .select("*")
    .order("update_at", { ascending: false });
  if (error) {
    console.log(error);
    // throw new Error(error.message);
  }
  // res?.forEach((each) => {
  //   console.log(each.uuid);
  // });
  return res || [];
}
