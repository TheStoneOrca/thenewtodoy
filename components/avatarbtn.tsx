"use client";

import { Settings } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { DropdownMenu } from "./ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { DropdownMenuTrigger } from "./ui/dropdown-menu";
import signOut from "./signoutbutton";
import SignOutButton from "./signoutbutton";

export default function AvatarButton() {
  return (
    <div className="flex flex-col">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Settings />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/user/details">Account Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/todos">My Todos</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/subscription">My Subscription</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
