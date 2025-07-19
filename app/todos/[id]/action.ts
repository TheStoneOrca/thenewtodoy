"use server";

import { createClient } from "@/app/utils/supabase/server";
import { error } from "console";

export async function CreateTodoElement(data: any) {
  const supabase = await createClient();

  const name = data.get("name") as string | null;
  const todoID = data.get("todo") as string | null;

  if (!name || !todoID) {
    console.error("Missing required fields.");
    return;
  }

  const { error } = await supabase.from("todoitems").insert({
    name: name,
    todoid: todoID,
    creator: (await supabase.auth.getUser()).data.user?.id,
  });

  if (error) {
    console.log(error);
  }
}

export async function GetTodoData(param: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("todoitems")
    .select()
    .eq("todoid", param);
  if (error) {
    console.error(error);
    return null;
  } else {
    return data;
  }
}

export async function DeleteTodoData(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("todoitems").delete().eq("id", id);
  if (error) {
    console.error(error);
  }
  return;
}

export async function EditTodoItemData(data: any) {
  const completed = data.get("isCompleted") ? true : null;
  const deadline = data.get("deadline");
  const name = data.get("name");
  const id = data.get("todoItemID");
  const supabase = await createClient();

  const { error } = await supabase
    .from("todoitems")
    .update({
      name: name,
      deadline: deadline,
      completed: completed,
    })
    .eq("id", id);
  if (error) {
    console.error(error);
  }
}
