import React from "react";
import { Box, Divider, Flex, Stack, Text } from "@mantine/core";
import { FaRegHeart, FaRegComment, FaBookmark } from "react-icons/fa6";
import { PiShareFatBold } from "react-icons/pi";

type PostProp = {
  post: {
    id: string;
    title: string;
    content: {
      time: number;
      blocks: Array<any>;
      version: string;
    };
    published: boolean;
    authorId: string;
    createdAt: string;
    updatedAt: string;
    pinnedLocationId: string;
  };
};

export default function PlaceCard({ post }: PostProp) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  console.log("card içi post", post);

  const description =
    post.content.blocks.length > 0
      ? post.content.blocks.map((block) => block.text).join(" ")
      : "No content available.";

  return (
    <Stack className="rounded-md bg-[#F6F8FA] dark:bg-[#3B3B3B] px-6 py-8 max-w-[600px]">
      <Flex className="group" gap="md" h={132}>
        <Box w={100} h="100%" pos="relative">
          <Box
            bg="#285F98"
            className="h-[50%] w-full transition-all duration-150 group-hover:h-full ease-in-out absolute bottom-0"
          />
          <Box
            className="p-3 absolute h-[calc(100%-16px)] w-[calc(100%-16px)] left-[8px] bottom-[8px] bg-no-repeat bg-cover bg-center
              group-hover:h-[calc(100%-32px)] group-hover:w-[calc(100%-32px)] group-hover:left-[16px] group-hover:bottom-[16px] ease-in-out transition-all duration-150"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1682588111806-cb4da7106742?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
            }}
          />
        </Box>
        <Stack style={{ gap: "0" }} justify="center" h="100%" w="100%">
          <Flex justify="space-between" align="start" className="h-full ">
            <Stack className="h-full space-y-0" gap={0}>
              <Text fw={500} size="md">
                {post.title || "Untitled Post"}
              </Text>
              <Text fw={400} size="xs" color="dimmed">
                {formattedDate}
              </Text>
            </Stack>
            <FaBookmark color="#285F98" />
          </Flex>
          <Text mt="xs" size="sm" lineClamp={4}>
            jdhgsfhsdgfhdsgf Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Voluptatibus atque facere consequatur non magni asperiores
            quisquam error cumque, at minima quo laborum suscipit maxime
            architecto inventore. Necessitatibus veritatis itaque ad!
          </Text>
        </Stack>
      </Flex>
      <Divider my="sm" />
      <Flex className="space-x-2 text-[#285F98]">
        <FaRegHeart size={20} />
        <FaRegComment size={20} />
        <PiShareFatBold size={20} />
      </Flex>
    </Stack>
  );
}
