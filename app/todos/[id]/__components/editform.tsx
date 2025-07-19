import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash, X } from "lucide-react";
import { EditTodoItemData } from "../action";
import { useEffect, useState } from "react";

export default function EditForm(props: {
  name: string;
  isCompleted: boolean | null;
  deadline: string | null;
  isShowing: any;
  id: number;
}) {
  useEffect(() => {
    document.getElementById("name").value = props.name;
    document.getElementById("deadline").value = props.deadline;
    document.getElementById("iscomplete").checked = props.isCompleted;
  }, []);
  return (
    <Card>
      <CardTitle>
        Edit your Todo Item!
        <Button
          onClick={() => {
            props.isShowing(false);
          }}
        >
          <X />
        </Button>
      </CardTitle>
      <CardContent>
        <form>
          <div className="flex flex-col">
            <Label>Name</Label>
            <Input type="text" name="name" id="name" required />
          </div>
          <div className="flex flex-col">
            <Label>Is Completed?</Label>
            <Input
              type="checkbox"
              name="isCompleted"
              id="iscomplete"
              defaultChecked={props.isCompleted ? props.isCompleted : false}
              defaultValue="complete"
            />
          </div>
          <div className="flex flex-col">
            <Label>Deadline?</Label>
            <div className="flex">
              {" "}
              <Input
                id="deadline"
                type="date"
                name="deadline"
                defaultValue={props.deadline ? props.deadline : ""}
              />
              <Button
                type="button"
                onClick={() => {
                  document.getElementById("deadline").type = "text";
                  document.getElementById("deadline").value = null;
                }}
              >
                <Trash />
              </Button>
            </div>
          </div>
          <Input type="hidden" value={props.id} name="todoItemID" />
          <Button
            formAction={async (data) => {
              await EditTodoItemData(data);
              window.location.reload();
            }}
          >
            Submit Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
