"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { PostCreation } from "../action";
import { Input } from "@/components/ui/input";

export default function TodoQstnCard() {
  const { register, handleSubmit } = useForm();
  return (
    <div className="w-full h-8 border">
      <form
        onSubmit={handleSubmit(PostCreation)}
        className="flex justify-center items-center"
      >
        <input
          required
          {...register("title")}
          type="text"
          className="w-full h-8 text-sm border-r"
          placeholder="Title"
        />
        <button className="">Create</button>
      </form>
    </div>
  );
}
