import { Box, Divider, Flex, Image, Stack } from "@mantine/core";
import NextImage from "next/image";
import React from "react";
import Cover from "@/public/profile-bg-cover.png";
import ProfileAvatar from "@/app/components/profile/ProfileAvatar";
import UserMeta from "@/app/components/profile/UserMeta";
import MapComponent from "@/app/components/map";
import PlaceCard from "@/app/components/profile/PlaceCard";
import { FaAngleDown } from "react-icons/fa6";

export default function Profile() {
  return (
    <Stack display="flex" mih="100vh">
      <Image component={NextImage} src={Cover} alt="My image" fit="contain" />
      <Flex pos="relative" top="-60px" mx="lg">
        <ProfileAvatar />
      </Flex>
      <Divider pos="relative" top="-50px" />
      <Flex className="justify-center items-start gap-4">
        <Stack>
          <UserMeta />
        </Stack>
        <Stack>
          <MapComponent />

          <Divider
            labelPosition="right"
            label={
              <Flex className="bg-[#F6F8FA] justify-center items-center px-2 py-3 ">
                <FaAngleDown color="#285F98" />
                <Box className="text-[#285F98] bg-[#F6F8FA]" ml={5}>
                  Most Recently
                </Box>
              </Flex>
            }
          />
          <Stack className="flex ml-auto max-w-[800px]" w="100%" gap={30}>
            <PlaceCard />
            <PlaceCard />
            <PlaceCard />
            <PlaceCard />
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
