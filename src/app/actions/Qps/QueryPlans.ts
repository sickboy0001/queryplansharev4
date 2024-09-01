"use server";

import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";

export async function selectAllQpsQueryPlans() {
  const supabase = createClient();
  const { data: res, error } = await supabase
    .from("qps_queryplans")
    .select("*")
    .order("update_at", { ascending: false });
  if (error) {
    console.log(error);
    // throw new Error(error.message);
  }
  //   console.log(res);
  return res || [];
}

export async function selectQpsQueryPlans(id: number) {
  const supabase = createClient();
  const { data: res, error } = await supabase
    .from("qps_queryplans")
    .select("*")
    .eq("id", String(id))
    .limit(1)
    .single();

  if (error) {
    console.log(error);
    // throw new Error(error.message);
  }
  //   console.log(res);
  return res || undefined;
}

export const RegistQpsQueryPlans = async ({
  params,
}: {
  params: {
    user_id: number;
    title: string;
    xml: string;
  };
}) => {
  const { user_id, title, xml } = params;

  //既存のXmlの確認
  //あるのなら更新日、タイトルのみ更新
  //ないのならInsrt
  const xml_hash = "";
  const now = new Date();
  const supabase = createClient();
  let thistitle = title;
  if (thistitle === "") {
    thistitle = format(now, "yyyy-MM-dd HH:mm:ss");
  }
  try {
    const { data: res, error } = await supabase
      .from("qps_queryplans")
      .insert([
        {
          user_id: user_id,
          title: thistitle,
          xml: xml,
          xml_hash: xml_hash,
          is_archive: false,
          is_open: true,
          create_at: now,
          update_at: now,
        },
      ])
      .select()
      .limit(1)
      .single();
    if (error) {
      console.log("RegistQpsQueryPlans-false", error);
    }
    console.log(res);
    return res;
  } catch (error) {
    console.log("RegistQpsQueryPlans-false", error);
  }
};
