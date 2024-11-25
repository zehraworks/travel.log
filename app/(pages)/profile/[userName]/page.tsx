import { Divider, Flex, Image, Stack } from "@mantine/core";
import NextImage from "next/image";
import React from "react";
import Cover from "@/public/profile-bg-cover.png";
import ProfileAvatar from "@/app/components/profile/ProfileAvatar";
import UserMeta from "@/app/components/profile/UserMeta";
import MapComponent from "@/app/components/map";
import PlaceCard from "@/app/components/profile/PlaceCard";

export default function Profile() {
  return (
    <Stack display="flex" mih="100vh">
      <Image component={NextImage} src={Cover} alt="My image" fit="contain" />
      <Flex pos="relative" top="-60px" mx="lg">
        <ProfileAvatar />
      </Flex>
      <Divider pos="relative" top="-50px" />
      <Flex justify="space-between">
        <UserMeta />
        <MapComponent />
      </Flex>
      <Divider my="xs" label="most recently" labelPosition="right" />
      <Stack className="flex ml-auto max-w-[800px]" w="100%" gap={30}>
        <PlaceCard />
        <PlaceCard />
        <PlaceCard />
        <PlaceCard />
      </Stack>
    </Stack>
  );
}
