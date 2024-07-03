"use client";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import UserAvatar from "./UserAvatar";

const TopUserBar = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between items-center w-full h-14 px-4 bg-slate-500">
      <span className="text-white">TN Logo</span>
      {session ? (
        <UserAvatar session={session} />
      ) : (
        <Button onClick={() => signIn()}>Sign In</Button>
      )}
    </div>
  );
};

export default TopUserBar;
