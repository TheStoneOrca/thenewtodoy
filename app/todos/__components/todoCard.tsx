"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Clipboard, Settings, Trash } from "lucide-react";
import { DeleteTodo, EditTodo } from "../action";
import { useState } from "react";
import Link from "next/link";

export default function TodoCard(props: { title: string; id: number }) {
  const [isShowingTodoEdit, setIsShowingTodoEdit] = useState<boolean>(false);
  return (
    <div className="flex justify-between w-full border h-8 items-center">
      {isShowingTodoEdit ? (
        <form
          action={async (data) => {
            await EditTodo({ id: data.get("id"), name: data.get("name") });
            window.location.reload();
          }}
        >
          <input
            type="text"
            className="font-bold"
            name="name"
            defaultValue={props.title}
          />
          <input type="hidden" value={props.id} name="id" />
        </form>
      ) : (
        <Link href={`/todos/${props.id}`}>{props.title}</Link>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Settings />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => setIsShowingTodoEdit(!isShowingTodoEdit)}
          >
            <Clipboard /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              await DeleteTodo({ id: props.id });
              window.location.reload();
            }}
          >
            <Trash /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
