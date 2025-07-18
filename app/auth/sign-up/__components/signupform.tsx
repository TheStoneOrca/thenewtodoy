"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignUp } from "../actions";

export default function SignUpForm() {
  return (
    <Card className="w-88">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Enter your email and password to create your account for Todoy!
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <form className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input name="email" type="text" />
          </div>
          <div className="grid gap-2">
            <Label>Password</Label>
            <Input name="password" type="password" />
          </div>
          <Button
            type="submit"
            className="w-full"
            formAction={async (data) => {
              await SignUp(data);
              window.location.href = "/todos";
            }}
          >
            Sign Up
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}
