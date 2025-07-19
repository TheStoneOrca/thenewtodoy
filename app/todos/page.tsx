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

export default function TodosPage() {
  const [todoGroups, setTodoGroups] = useState<any>([]);
  const [isShowingQstn, setIsShowingQstn] = useState<boolean>(false);
  const supabase = createClient();

  useEffect(() => {
    const getTodos = async () => {
      const myTodos: any = await supabase.from("todos").select();
      return myTodos;
    };
    const groupedTodos: number[][] = [];

    function seeMaxAmmountofCards() {
      let x = window.screen.width / 248;
      return Math.ceil(x);
    }

    const cardAmmount = seeMaxAmmountofCards();

    getTodos().then((userTodos) => {
      while (userTodos.data.length > 0) {
        groupedTodos.push(userTodos.data.splice(0, cardAmmount));
      }
      setTodoGroups(groupedTodos);
    });
  }, []);
  return (
    <>
      {todoGroups ? (
        <>
          <div className="flex flex-col items-center gap-12">
            <Card className="w-48 h-48 flex self-start justify-center">
              <Button
                className="w-24 h-24"
                onClick={() => setIsShowingQstn(!isShowingQstn)}
              >
                <Plus />
              </Button>
            </Card>

            {isShowingQstn && (
              <div className="justify-self-center self-center">
                <TodoQstnCard />
              </div>
            )}
            <div className="flex-col w-full flex justify-start gap-8">
              {todoGroups.map((group: any, idx: any) => (
                <div key={idx} className="flex gap-6">
                  {group.map((cardInfo: any, i: any) => (
                    <TodoCard key={i} title={cardInfo.name} id={cardInfo.id} />
                  ))}
                </div>
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
