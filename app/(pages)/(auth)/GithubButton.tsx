"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Button, Notification } from "@mantine/core";
import { BsGithub } from "react-icons/bs";

export default function GithubButton() {
  const [error, setError] = useState<string | null>(null);

  const handleGithubSignIn = async () => {
    try {
      const result = await signIn("github", { callbackUrl: "/" });
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (
    <>
      {error && (
        <Notification
          color="red"
          onClose={() => setError(null)}
          className="mb-4"
        >
          {error}
        </Notification>
      )}
      <Button
        leftSection={<BsGithub className="h-5 w-5 mr-4 text-slate-200" />}
        className="w-1/2 h-auto"
        variant="outline"
        styles={{
          root: {
            borderColor: "rgb(71, 85, 105)",
            color: "rgb(226, 232, 240)",
            "&:hover": {
              borderColor: "rgb(51, 65, 85)",
              backgroundColor: "rgb(30, 41, 59)",
            },
          },
        }}
        onClick={handleGithubSignIn}
      >
        <p>Continue with Github</p>
      </Button>
    </>
  );
}
