"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut } from "lucide-react";
import { Session } from "next-auth";
import SignoutButton from "@/components/top-bar/SignoutButton";
import { useSession } from "next-auth/react";
import { useState } from "react";

const USER_AVATAR_FALLBACK = "X";

export default function UserAvatar({ session }: { session: Session | null }) {
  const [avatarLoading, setAvatarLoading] = useState(true);

  const { status } = useSession();

  const getAbbreviatedUserName = (name: string | null | undefined) => {
    if (!name) return USER_AVATAR_FALLBACK; // X is cool default

    const [firstName, lastName] = name.split(" ");
    const output = firstName[0];
    if (lastName?.length > 0) return output + lastName[0];
    return output;
  };

  const handleAvatarImageLoadingStatusChange = (status: "idle" | "loading" | "loaded" | "error") => {
    if (status === "loaded") {
      setAvatarLoading(false);
    } else if (status === "loading") {
      setAvatarLoading(true);
    }
  }

  return (
    <div>
      {status === "loading"
        ? (
          <div>LOADING</div>
        )
        : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={session?.user?.image ?? undefined} onLoadingStatusChange={handleAvatarImageLoadingStatusChange}/>
                {avatarLoading 
                ? (
                  <Skeleton className="aspect-square w-full h-full rounded-full" />
                )
                : (
                  <AvatarFallback>
                    {!session?.user?.image
                      ? getAbbreviatedUserName(session?.user?.name)
                      : USER_AVATAR_FALLBACK}
                  </AvatarFallback>
                )
                }
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <SignoutButton />
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    </div>
  );
}
