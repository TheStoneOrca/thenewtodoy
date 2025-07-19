"use client";

import { useEffect, useState } from "react";
import TodoCard from "./__components/todoCard";
import { createClient } from "../utils/supabase/client";
import { Loader, Loader2Icon, Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TodoQstnCard from "./__components/todoQstnCard";
import { Label } from "@/components/ui/label";

export default function TodosPage() {
  const [todoGroups, setTodoGroups] = useState<any>([]);
  const [isShowingQstn, setIsShowingQstn] = useState<boolean>(false);
  const [isShowingTodoEdit, setIsShowingTodoEdit] = useState<boolean>(false);
  const supabase = createClient();

  useEffect(() => {
    const getTodos = async () => {
      const { data, error }: any = await supabase.from("todos").select();
      return data;
    };

    getTodos().then((userTodos) => {
      setTodoGroups(userTodos);
    });
  }, []);
  return (
    <>
      {todoGroups ? (
        <>
          <div className="flex flex-col items-center gap-12">
            <div className="flex-col w-full flex justify-center items-center">
              <h1 className="text-[1.6rem]" style={{ fontSize: "1.6rem" }}>
                <b> Your Todo Lists</b>
              </h1>
              <hr />
              <div
                className="h-8 items-center w-full border flex gap-1"
                onClick={() => setIsShowingQstn(!isShowingQstn)}
              >
                <Plus />
                Create New
              </div>
              {isShowingQstn && <TodoQstnCard />}
              {todoGroups.map((cardInfo: any, i: any) => (
                <TodoCard key={i} title={cardInfo.name} id={cardInfo.id} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <Loader2Icon className="animate-spin" />
      )}
    </>
  );
}
