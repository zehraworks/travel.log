"use client";

import { signIn } from "next-auth/react";
import { Button, useMantineTheme } from "@mantine/core";
import { BsGoogle } from "react-icons/bs";

export default function GoogleButton() {
  const theme = useMantineTheme();

  return (
    <Button
      className="w-full flex justify-center items-center"
      variant="outline"
      color="dark"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      <BsGoogle
        className="h-5 w-5 mr-3"
        style={{ color: theme.colors.dark[6] }}
      />
      <p>Continue with Google</p>
    </Button>
  );
}
