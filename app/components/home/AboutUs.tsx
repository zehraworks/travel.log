import { Box, Divider, Text, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";

export default function AboutUs() {
  return (
    <Box className="flex-col items-end justify-end w-full h-auto gap-y-16 relative">
      <Box className="absolute top-14 right-0">
        <FaLocationDot className="rotate-90" color="#DD6224" size="1.5rem" />
        <Divider
          orientation="vertical"
          size={2}
          color="#DD6224"
          h={300}
          variant="dashed"
        />
      </Box>

      <Box className="pt-30">
        <Title order={1} className="text-center w-full pb-20 ">
          ABOUT US
        </Title>
        <Box className=" h-[calc(16rem+12px)] flex justify-between">
          <Box className="flex justify-center relative bg-[#285F98] dark:bg-[#1E1E1E] h-1/2 w-[calc(50%-25px)] rounded-b-sm">
            <Box className="absolute top-3 h-64 w-[calc(100%-24px)]">
              <Image
                src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="about us"
                fill
                className="rounded-b-sm"
              />
            </Box>
          </Box>
          <Box className="h-full w-[calc(50%-25px)] flex items-end">
            <Box className="bg-[#EDF3F8] dark:bg-[#1E1E1E] w-full p-4 rounded-b-sm">
              <Text>
                Catherine unwilling elf bertie eeylops cottage candles them
                teacup. Wand aurors servant wronski plums motorcycle hollow
                prophecies fire-whisky. Pumpkin boggarts elder bezoar captivity
                inches bezoar parvati chasers owl. Tell treats disciplinary
                crookshanks first holly cleansweep diadem fire. Black tail on...
                Read More
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
