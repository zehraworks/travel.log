"use client";
import { Image, Text, Group, Box } from "@mantine/core";

export default function BlogCard() {
  return (
    <Box h={380} pos="relative" className="w-full">
      <Box className="rounded-t-md flex items-center justify-center absolute z-20">
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          h={200}
          w="90%"
          mx="auto"
          alt="Norway"
          styles={{ root: { borderRadius: "5px 5px 0px 0px" } }}
        />
      </Box>

      <Box className="h-2/3 bg-[#1E1E1E] absolute bottom-0 left-0 right-0 px-4 pt-20 rounded-b-sm">
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Norway Fjord Adventures</Text>
        </Group>
        <Text size="sm" c="dimmed">
          With Fjord Tours you can explore more of the magical fjord landscapes
          with tours and activities on and around the fjords of Norway
        </Text>
      </Box>
    </Box>
  );
}
