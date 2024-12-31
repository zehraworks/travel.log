"use client";
import React from "react";
import Image from "next/image";
import worldMap from "../../../public/worldMap.svg";
import { Box, Text } from "@mantine/core";

export default function Intro() {
  return (
    <div>
      <Image
        alt="worldMap"
        src={worldMap}
        className="h-auto w-full px-12 mt-10"
      />
      <Box className="relative h-20 w-full bg-[#DD6224] rounded-sm mt-10">
        <Box className="absolute w-[calc(100%-20px)] z-10 space-x-2 flex mx-auto items-center text-center inset-0">
          <Box className="flex justify-center items-center gap-x-2 h-32 w-1/3 bg-[#FCF1EB] dark:bg-[#1E1E1E] rounded-sm">
            <h2 className="text-5xl font-bold">130</h2>
            <h2 className="text-3xl font-medium">Travellers</h2>
          </Box>
          <Box className="flex justify-center items-center gap-x-2 h-32 w-1/3 bg-[#FCF1EB] dark:bg-[#1E1E1E]  rounded-sm">
            <h2 className="text-5xl font-bold">1400</h2>
            <h2 className="text-3xl font-medium">Pins</h2>
          </Box>
          <Box className="flex justify-center items-center gap-x-3 h-32 w-1/3 bg-[#FCF1EB] dark:bg-[#1E1E1E]  rounded-sm">
            <h2 className="text-5xl font-bold">50tons</h2>
            <h2 className="text-3xl font-medium text-center">
              <span className="block">Avoided</span>
              <span className="block">CO2</span>
            </h2>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
