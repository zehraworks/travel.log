"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { Button, useMantineTheme } from "@mantine/core";
import { BsGithub } from "react-icons/bs";

export default function GithubButton() {
  const theme = useMantineTheme();

  return (
    <Button
      className="w-full flex justify-center items-center"
      variant="outline"
      color="dark"
      onClick={() => signIn("github", { callbackUrl: "/" })}
    >
      <BsGithub
        className="h-5 w-5 mr-4"
        style={{ color: theme.colors.dark[6] }}
      />
      <p>Continue with Github</p>
    </Button>
  );
}
