import { Box, Container, Divider } from "@mantine/core";
import Intro from "./Intro";
import JoinOurNewsletter from "./JoinOurNewsletter";
import OurBlog from "./OurBlog";
import AboutUs from "./AboutUs";
import LocationIcon from "./LocationIcon";
import { FaLocationDot } from "react-icons/fa6";

export default function HomeComponent() {
  return (
    <Container className="grid gap-y-20">
      <Intro />
      <OurBlog />
      <AboutUs />
      <LocationIcon />
      <JoinOurNewsletter />
      <Box className="flex items-end justify-center">
        <FaLocationDot color="#DD6224" size="1.5rem" />
        <Divider size={2} color="#DD6224" w={200} variant="dashed" />
      </Box>
    </Container>
  );
}
