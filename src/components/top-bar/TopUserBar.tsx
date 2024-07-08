import UserAvatar from "./UserAvatar";
import SigninButton from "./SigninButton";

export default function TopUserBar() {
  return (
    <div className="flex justify-between items-center w-full h-14 px-4 bg-slate-500">
      <span className="text-white">TN Logo</span>
      {/* {session ? <UserAvatar session={session} /> : <SigninButton />} */}
    </div>
  );
}
