"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { BsGithub } from "react-icons/bs";

export default function GoogleButton() {
  return (
    <Button
      className="w-full flex bg-transparent text-primary-foreground rounded-sm border-[1px]  border-primary-foreground "
      onClick={() => signIn("github", { callbackUrl: "/" })}
    >
      <BsGithub className="h-5 w-5 mr-4 text-primary-foreground" />
      <p>Continue with Github</p>
    </Button>
  );
}
