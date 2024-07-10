import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default function SigninButton() {
  const signin = async () => {
    "use server";

    await signIn();
  }

  return (
    <form action={signin}>
      <Button type="submit">Sign In</Button>
    </form>
  );
}
