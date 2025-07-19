"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Check,
  Clipboard,
  Loader2Icon,
  Plus,
  Settings,
  Trash,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CreateTodoElement, DeleteTodoData, GetTodoData } from "./action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditForm from "./__components/editform";
import { createClient } from "@/app/utils/supabase/client";

export default function PostsPage() {
  const { id } = useParams();
  const [isShowing, setIfShowing] = useState<boolean>(false);
  const [showingEdit, setIfShowingEdit] = useState<boolean>(false);
  const [todos, setTodos] = useState<Array<object>>();

  useEffect(() => {
    const getTodoItems = async () => {
      const retrievedTodos = await GetTodoData(id);
      return retrievedTodos;
    };

    const checkIfTodoExists = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("todos").select().eq("id", id);
      if (data[0] == null || data == null) {
        window.location.href = "/error";
      } else {
        return;
      }
    };

    checkIfTodoExists().then(() => {
      getTodoItems().then((res) => {
        setTodos(res);
      });
    });
  }, []);

  return (
    <>
      {todos ? (
        <>
          <div className="flex flex-col">
            <div className="flex flex-col w-96 gap-4">
              {todos.map((todoItem) => (
                <Card key={todoItem.id}>
                  <CardHeader>
                    <CardTitle>{todoItem.name}</CardTitle>
                    <CardDescription className="flex justify-between">
                      <h1>
                        {todoItem.deadline ? todoItem.deadline : "No deadline"}
                      </h1>
                      {todoItem.completed == true ? (
                        <h1 className="text-green-600">Completed!</h1>
                      ) : (
                        <h1 className="text-red-600">Not completed!</h1>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Settings />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={async () => {
                            await DeleteTodoData(todoItem.id);
                            window.location.reload();
                          }}
                        >
                          <Trash />
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setIfShowingEdit(!showingEdit)}
                        >
                          <Clipboard />
                          Edit
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {showingEdit && (
                      <EditForm
                        name={todoItem.name}
                        isCompleted={todoItem.completed}
                        deadline={todoItem.deadline}
                        isShowing={setIfShowingEdit}
                        id={todoItem.id}
                      />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div>
              <Button
                onClick={() => {
                  setIfShowing(!isShowing);
                }}
              >
                <Plus />
              </Button>
            </div>
            {isShowing && (
              <form className="flex">
                <Input
                  required
                  type="text"
                  name="name"
                  placeholder="Name of Todo"
                  className="border"
                />
                <Input type="hidden" value={id} name="todo" />
                <Button
                  formAction={async (data: any) => {
                    await CreateTodoElement(data);
                    window.location.reload();
                  }}
                >
                  <Check />
                </Button>
              </form>
            )}
          </div>
        </>
      ) : (
        <Loader2Icon className="animate-spin" />
      )}
    </>
  );
}
