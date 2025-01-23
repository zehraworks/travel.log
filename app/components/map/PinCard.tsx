import {
  ActionIcon,
  Box,
  Card,
  Group,
  Image,
  SimpleGrid,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { FaNoteSticky, FaTrashCan } from "react-icons/fa6";

const images = [
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
];

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
    <Card
      withBorder
      shadow="sm"
      radius="md"
      onMouseEnter={handleInfoWindowMouseEnter}
      onMouseLeave={handleInfoWindowMouseLeave}
    >
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={500}>Review pictures</Text>
        </Group>
      </Card.Section>
      {posts?.map((post) => <Title key={post.id}>{post.title}</Title>)}

      <Text>{place.name}</Text>

      <Card.Section inheritPadding mt="sm" pb="md">
        <SimpleGrid cols={3}>
          {images.map((image) => (
            <Image src={image} key={image} radius="sm" />
          ))}
        </SimpleGrid>
      </Card.Section>

      <Box>
        <Tooltip label="Add Post">
          <ActionIcon
            size="md"
            variant="filled"
            color="blue"
            radius="xl"
            onClick={() => handleAddPost(place.id)}
          >
            <FaNoteSticky size={13} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete Place">
          <ActionIcon
            size="md"
            variant="filled"
            color="red"
            radius="xl"
            onClick={() => handleDelete(place.id)}
          >
            <FaTrashCan size={12} />
          </ActionIcon>
        </Tooltip>
      </Box>
    </Card>
  );
}
