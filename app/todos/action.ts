"use server";

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";

export async function PostCreation(info: { title: string; userid: string }) {
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

export async function DeleteTodo(info: { id: number }) {
  const supabase = await createClient();

  const { error } = await supabase.from("todos").delete().eq("id", info.id);
  if (error) {
    console.error(error);
    return redirect("/error");
  }
}

export async function EditTodo(info: { id: number; name: string }) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("todos")
    .update({ name: info.name })
    .eq("id", info.id);
  if (error) {
    console.error(error);
    return redirect("/error");
  }
}
