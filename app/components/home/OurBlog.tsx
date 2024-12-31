import React from "react";
import BlogCard from "./Card";
import { Box, Divider, Flex, Text, Title } from "@mantine/core";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";

export default function OurBlog() {
  return (
    <Box className="container mx-auto px-4 mt-10 flex flex-col items-center">
      <Flex
        className="w-full h-full"
        justify="center"
        align="center"
        direction="column"
      >
        <Flex className="relative items-start w-full mb-28">
          <Box className="absolute left-0 flex items-end">
            <FaLocationDot color="#DD6224" size="1.5rem" />
            <Divider size={2} color="#DD6224" w={200} variant="dashed" />
          </Box>
          <Title order={1} className="text-center w-full">
            OUR BLOG
          </Title>
        </Flex>
      </Flex>
      <Box className="flex justify-center w-full gap-16">
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </Box>
    </Box>
  );
}
