import { Card, CardSection, Flex, Image, Stack, Text } from "@mantine/core";
import React from "react";

export default function PlaceCard() {
  return (
    <Flex bg="#f6f8fa">
      <Image
        src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
        h={160}
        alt="No way!"
      />
      <Stack>
        <Text fw={500} size="lg">
          You&apos;ve won a million dollars in cash!
        </Text>
        <Text fw={400}>You&apos;ve won a million dollars in cash!</Text>
        <Text mt="xs" c="dimmed" size="sm">
          Please click anywhere on this card to claim your reward, this is not a
          fraud, trust us
        </Text>
      </Stack>
    </Flex>
  );
}
