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
import { SignIn } from "../actions";

export default function SignInForm() {
  return (
    <Card className="w-88">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your email and password to sign into your account for Todoy!
        </CardDescription>
      </CardHeader>
      <CardContent>
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
              await SignIn(data);
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
