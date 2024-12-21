import {
  Box,
  Card,
  CardSection,
  Center,
  Divider,
  Flex,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import React from "react";
import { FaRegHeart, FaRegComment, FaBookmark } from "react-icons/fa6";
import { PiShareFatBold } from "react-icons/pi";

export default function PlaceCard() {
  return (
    <Stack className="rounded-md bg-[#F6F8FA] px-4 py-4" style={{ gap: "0" }}>
      <Flex className="justify-center items-center group" gap="md" h={132}>
        <Flex w="100" h="100%" justify="center" align="end">
          <Box
            w={100}
            pos="relative"
            className="h-full flex flex-col justify-end "
          >
            <Box
              bg="#285F98"
              className="h-[50%] w-full transition-all duration-150 group-hover:h-full ease-in-out"
            />
            <Box
              className="p-3 absolute h-[calc(100%-16px)] w-[calc(100%-16px)] left-[8px] bottom-[8px] bg-no-repeat bg-cover bg-center
                group-hover:h-[calc(100%-32px)] group-hover:w-[calc(100%-32px)] group-hover:left-[16px] group-hover:bottom-[16px] ease-in-out transition-all duration-150
              "
              style={{
                backgroundImage: `url(
                "https://plus.unsplash.com/premium_photo-1734498806724-a5e9431ff4f3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                )`,
              }}
            />
          </Box>
        </Flex>
        <Stack style={{ gap: "0" }} className="justify-center gap-0 h-100">
          <Box className="flex justify-between items-center">
            <Stack gap={0}>
              <Text fw={500} size="md">
                Berlin, Germany
              </Text>
              <Text fw={400} size="xs" c="dimmed">
                3 Sept
              </Text>
            </Stack>
            <FaBookmark color="#285F98" />
          </Box>
          <Text mt="xs" size="sm" lineClamp={4}>
            Please click anywhere on this card to claim your reward, this is not
            a fraud, trust us Lorem ipsum dolor sit amet consectetur adipisicing
            elit. A amet doloribus alias quisquam omnis illo velit. Provident
            libero, sequi non aperiam tempora odio id perferendis corporis, cum
            beatae a dignissimos. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Rem doloremque iusto sint iure odit autem maxime
            repellendus tenetur architecto distinctio fugiat reprehenderit culpa
            quae, voluptates, blanditiis ducimus eaque officia consequatur.
            <span>Read More</span>
          </Text>
        </Stack>
      </Flex>
      <Divider my="md" />
      <Flex w="100" className="space-x-2 text-[#285F98]">
        <FaRegHeart size={25} />
        <FaRegComment size={25} />
        <PiShareFatBold size={25} />
      </Flex>
    </Stack>
  );
}
