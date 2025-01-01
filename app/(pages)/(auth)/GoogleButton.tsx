"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@mantine/core";
import { BsGoogle } from "react-icons/bs";

export default function GoogleButton() {
  return (
    <Button
      leftSection={<BsGoogle className="h-5 w-5 mr-3 text-slate-200" />}
      className="w-1/2 h-auto flex justify-center items-center"
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
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      <p>Continue with Google</p>
    </Button>
  );
}
