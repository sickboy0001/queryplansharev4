"use server";

import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid"; // UUIDライブラリのインポート

export async function selectQpsQueryPlansLinkedUrl(uuid: string) {
  const supabase = createClient();
  const { data: res, error } = await supabase
    .from("qps_queryplans_linkedurl")
    .select("*")
    .eq("uuid", uuid)
    .limit(1)
    .single();

  if (error) {
    console.log(error);
    // throw new Error(error.message);
  }
  //   console.log(res);
  return res || undefined;
}

export const RegistQpsQueryPlansLinkedUrl = async ({
  params,
}: {
  params: {
    queryplans_id: number;
  };
}) => {
  const supabase = createClient();

  const { queryplans_id } = params;
  const uuid = uuidv4();
  try {
    const { data: res, error } = await supabase
      .from("qps_queryplans_linkedurl")
      .insert([
        {
          queryplans_id: queryplans_id,
          uuid: uuid,
        },
      ])
      .select()
      .limit(1)
      .single();
    if (error) {
      console.log("RegistQpsQueryPlansLinkedUrl-false", error);
    }
    console.log(res);
    return res;
  } catch (error) {
    console.log("RegistQpsQueryPlans-false", error);
  }
};
