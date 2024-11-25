import { Stack, Text } from "@mantine/core";
import React from "react";

export default function UserMeta() {
  return (
    <Stack c="cyan" bg="grape" gap={30} w={250}>
      <Stack>
        <Text size="lg" tt="uppercase">
          Badges
        </Text>
        <Text c="dimmed">Badges</Text>
      </Stack>
      <Stack>
        <Text size="lg" tt="uppercase">
          Friends
        </Text>
        <Text c="dimmed">Friends</Text>
      </Stack>
      <Stack>
        <Text size="lg" tt="uppercase">
          Socials
        </Text>
        <Text c="dimmed">Socials</Text>
      </Stack>
    </Stack>
  );
}
