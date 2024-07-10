import UserAvatar from "./UserAvatar";
import SigninButton from "./SigninButton";
import { Session } from "next-auth";

export default function TopUserBar({ session }: { session: Session | null }) {
  return (
    <div className="flex justify-between items-center w-full h-14 px-4 bg-slate-500">
      <span className="text-white">TN Logo</span>
      {session ? <UserAvatar session={session} /> : <SigninButton />}
    </div>
  );
}
