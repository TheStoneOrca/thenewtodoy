"use server";

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";

export default async function PostCreation(info: {
  title: string;
  userid: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/error");
  }

  const { data, error } = await supabase
    .from("todos")
    .insert({ name: info.title, creator: user?.id })
    .select();
  if (!data || error) {
    return redirect("/error");
  } else {
    console.log("success");
    const url = "/todos/" + data[0].id;
    return redirect(url);
  }
}
