"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import PostCreation from "../action";
import { Input } from "@/components/ui/input";

export default function TodoQstnCard() {
  const { register, handleSubmit } = useForm();
  return (
    <div className="w-full h-full">
      <Card className="w-64 h-56">
        <CardTitle>Todo Creation</CardTitle>
        <CardContent>
          <form
            onSubmit={handleSubmit(PostCreation)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col">
              <Label>Title</Label>
              <Input type="text" {...register("title")} />
            </div>

            <Button>Create</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
