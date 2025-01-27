import {
  ActionIcon,
  Box,
  Card,
  Divider,
  Group,
  Image,
  SimpleGrid,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { FaNoteSticky, FaTrashCan } from "react-icons/fa6";

type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  // Others
};

type Place = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  desc?: string;
  continent?: string;
  status: string;
  userId: string;
  // Others
};
type PinCardProps = {
  posts: Post[];
  place: Place;
  handleInfoWindowMouseEnter: () => void;
  handleInfoWindowMouseLeave: () => void;
  handleAddPost: (placeId: string) => void;
  handleDelete: (id: string) => void;
};

export default function PinCard({
  posts,
  place,
  handleInfoWindowMouseEnter,
  handleInfoWindowMouseLeave,
  handleAddPost,
  handleDelete,
}: PinCardProps) {
  return (
    <Box
      className="flex flex-col h-40 bg-white gap-y-2 px-4 pb-3 "
      onMouseEnter={handleInfoWindowMouseEnter}
      onMouseLeave={handleInfoWindowMouseLeave}
    >
      <Title className=" text-gray-900 !text-base underline underline-offset-3 ">
        {place.name}
      </Title>

      {posts?.map((post) => (
        <Text className="!text-gray-700 !text-xs" key={post.id}>
          {post.title}
        </Text>
      ))}

      <Box className="flex justify-start gap-x-1">
        <Tooltip label="Add Post">
          <ActionIcon
            size="26px"
            variant="filled"
            color="blue"
            radius="xl"
            onClick={() => handleAddPost(place.id)}
          >
            <FaNoteSticky size={12} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete Place">
          <ActionIcon
            size="26px"
            variant="filled"
            color="red"
            radius="xl"
            onClick={() => handleDelete(place.id)}
          >
            <FaTrashCan size={11} />
          </ActionIcon>
        </Tooltip>
      </Box>
    </Box>
  );
}
