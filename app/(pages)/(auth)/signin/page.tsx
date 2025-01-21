"use client";

import React from "react";
import GoogleButton from "../GoogleButton";
import GithubButton from "../GithubButton";
import SignInForm from "./form";
import Link from "next/link";
import { Box, Text, Title } from "@mantine/core";
import Image from "next/image";

const SignIn: React.FC = () => {
  return (
    <Box className="flex justify-between items-center h-[500px] w-full">
      <Box className="flex items-end justify-center w-1/2 h-full">
        <Box className="relative flex justify-center bg-[#285F98] dark:bg-[#1E1E1E] h-1/2 w-11/12  mt-auto rounded-t-sm ">
          <Box className="absolute bottom-3 h-[480px] w-[calc(100%-24px)]">
            <Image
              src="https://images.unsplash.com/photo-1627935603339-947ec185b440?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="explore"
              className="rounded-t-sm"
              fill
            />
          </Box>
        </Box>
      </Box>
      <Box className="gap-y-5 flex flex-col items-center justify-center w-1/2 h-full px-8">
        <Title className="w-full font-bold text-3xl">Welcome to Travelog</Title>

        <SignInForm />
        <Box className="flex items-center justify-center">
          <Text>--- or ---</Text>
        </Box>

        <Box className="w-full flex items-center justify-between">
          <GoogleButton />
          <GithubButton />
        </Box>
        <Text className="text-sm" td="underline">
          <Link href="/signup">Create a new Travelog account.</Link>
        </Text>
      </Box>
    </Box>
  );
};

export default SignIn;
