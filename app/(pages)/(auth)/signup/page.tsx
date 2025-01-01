"use client";

import React from "react";
import GoogleButton from "../GoogleButton";
import GithubButton from "../GithubButton";
import SignUpForm from "./form";
import { Box, Text, Title } from "@mantine/core";
import Image from "next/image";

export default function Signup() {
  return (
    <Box className="flex justify-between items-center h-[500px] w-full">
      <Box className="flex items-end justify-center w-1/2 h-full">
        <Box className="relative flex justify-center bg-[#285F98] dark:bg-[#1E1E1E] h-1/2 w-11/12  mt-auto rounded-t-sm ">
          <Box className="absolute bottom-3 h-[480px] w-[calc(100%-24px)]">
            <Image
              src="https://images.unsplash.com/photo-1482398650355-d4c6462afa0e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="explore"
              className="rounded-t-sm"
              fill
            />
          </Box>
        </Box>
      </Box>
      <Box className="flex flex-col items-center justify-center w-1/2 h-full">
        <Title className="w-full font-bold text-3xl">Welcome to Travelog</Title>
        <Box className="w-full flex flex-col space-y-1">
          <Text className="font-extralight text-xs">
            Create a free account and start to explore.
          </Text>
          <SignUpForm />
          <Box className="flex items-center justify-center">
            <Text>--- or ---</Text>
          </Box>
          <Box className="w-full flex items-center justify-between">
            <GoogleButton />
            <GithubButton />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
