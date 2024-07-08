"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

const USER_AVATAR_FALLBACK = "X";

export default function UserAvatar() {
  const getAbbreviatedUserName = (name: string | null | undefined) => {
    if (!name) return USER_AVATAR_FALLBACK; // X is cool default

    const [firstName, lastName] = name.split(" ");
    const output = firstName[0];
    if (lastName?.length > 0) return output + lastName[0];
    return output;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Avatar className="cursor-pointer">
          <AvatarImage src={session?.user?.image ?? undefined} />
          <AvatarFallback>
            {!session?.user?.image
              ? getAbbreviatedUserName(session?.user?.name)
              : USER_AVATAR_FALLBACK}
          </AvatarFallback>
        </Avatar> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
