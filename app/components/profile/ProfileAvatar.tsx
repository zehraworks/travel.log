"use client";
import React from "react";
import { Avatar, Flex, Stack, Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import { FaEnvelope, FaBell } from "react-icons/fa";

type SessionUser = {
  name?: string;
  email?: string;
  image?: string;
};

export default function ProfileAvatar() {
  const { data: session } = useSession();
  const user = session?.user as SessionUser;

  return (
    <Flex justify="space-between" align="flex-end" w="100%">
      <Stack>
        <Avatar size="xl" src={user?.image} alt="it's me" />
        <Text size="lg">{user?.name}</Text>
        <Text size="sm">📍 Location</Text>
      </Stack>
      <Flex gap="sm">
        <FaEnvelope size={25} />
        <FaBell size={25} />
      </Flex>
    </Flex>
  );
}
