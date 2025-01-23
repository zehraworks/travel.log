"use client";
import { Box, Divider, Flex, Image, Stack, Text } from "@mantine/core";
import NextImage from "next/image";
import React, { useEffect, useState } from "react";
import Cover from "@/public/profile-bg-cover.png";
import ProfileAvatar from "@/app/components/profile/ProfileAvatar";
import UserMeta from "@/app/components/profile/UserMeta";
import MapComponent from "@/app/components/map";
import PlaceCard from "@/app/components/profile/PlaceCard";
import { FaAngleDown } from "react-icons/fa6";

export default function Profile() {
  const [posts, setPosts] = useState<[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlaces() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/post/getAllPostsOfUser");

        if (!response.ok) {
          throw new Error("Failed to fetch places");
        }

        const data = await response.json();
        setPosts(data.posts || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchPlaces();
  }, []);

  console.log("fetched places", posts);
  return (
    <Stack display="flex" mih="100vh">
      <Image component={NextImage} src={Cover} alt="My image" fit="contain" />
      <Flex pos="relative" top="-60px" mx="lg">
        <ProfileAvatar />
      </Flex>
      <Divider pos="relative" top="-50px" />
      <Flex className="w-full justify-center items-start gap-4">
        <Stack className=" h-full w-1/4">
          <UserMeta />
        </Stack>
        <Stack className="w-3/4">
          <MapComponent />

          <Divider
            labelPosition="right"
            label={
              <Flex className="bg-[#F6F8FA] justify-center items-center px-2 py-3 ">
                <FaAngleDown color="#285F98" />
                <Box
                  className="text-[#285F98] bg-[#F6F8FA] dark:bg-[E0E0E0] dark:text-[#1E1E1E] rounded-md"
                  ml={5}
                >
                  Most Recently
                </Box>
              </Flex>
            }
          />
          <Stack className="flex ml-auto max-w-[800px]" w="100%" gap={30}>
            {loading ? (
              <Text>Loading places...</Text>
            ) : error ? (
              <Text color="red">{error}</Text>
            ) : posts.length === 0 ? (
              <Text>No places found.</Text>
            ) : (
              posts.map((post: any) => <PlaceCard key={post.id} post={post} />)
            )}
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
