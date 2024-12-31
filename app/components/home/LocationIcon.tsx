import { Box, Divider } from "@mantine/core";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";

export default function LocationIcon() {
  return (
    <Box className="flex items-center justify-center">
      <Box className="flex justify-end ">
        <FaLocationDot className="-rotate-90" color="#DD6224" size="1.5rem" />
        <Divider
          orientation="vertical"
          size={2}
          color="#DD6224"
          h={300}
          variant="dashed"
          className="mt-6"
        />
      </Box>
    </Box>
  );
}
