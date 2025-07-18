"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { createClient } from "@/app/utils/supabase/client";
import { Loader2Icon } from "lucide-react";
import AvatarButton from "./avatarbtn";

export default function NavBar() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>();
  const supabase = createClient();
  useEffect(() => {
    const fetchUser = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (user.user != null) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="flex w-full h-full justify-between items-center border-b border-[#F1F1F1]">
      <h1>Todoy</h1>
      <div className="flex justify-center items-center">
        <Button asChild variant="ghost">
          <Link href="/todos">My Todos</Link>
        </Button>
      </div>

      <>
        {isSignedIn !== null ? (
          <>
            {isSignedIn == true ? (
              <AvatarButton />
            ) : (
              <div className="flex gap-4">
                <Button variant="ghost">
                  <Link href="/auth/sign-up">Sign Up</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/auth/sign-in">Sign In</Link>
                </Button>
              </div>
            )}
          </>
        ) : (
          <Loader2Icon className="animate-spin" />
        )}
      </>
    </div>
  );
}
