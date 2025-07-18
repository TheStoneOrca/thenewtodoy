"use client";

import { createClient } from "@/app/utils/supabase/client";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

export default function SignOutButton() {
  const signOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut({ scope: "local" });
    if (error) {
      redirect("error");
    }
    window.location.href = "/sign-in";
  };
  return (
    <div
      onClick={async () => {
        await signOut();
      }}
    >
      Sign Out
    </div>
  );
}
