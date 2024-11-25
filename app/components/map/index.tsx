"use client";
import React from "react";
import TripForm from "./TripForm";
import Map from "./Map";
import { useState } from "react";
import { Box, Stack } from "@mantine/core";

type PlaceCoordinate = {
  latitude: number;
  longitude: number;
};

type PinnedLocation = {
  id: string;
  name: string;
  desc?: string;
  latitude: number;
  longitude: number;
  status: string;
  continent?: string;
  userId: string;
};

export default function MapComponent() {
  const [placeCoordinate, setPlaceCoordinate] =
    useState<PlaceCoordinate | null>(null);
  const [pinnedLocations, setPinnedLocations] = useState<PinnedLocation[]>([]);

  return (
    <Stack>
      <Box miw={800}>
        <TripForm
          placeCoordinate={placeCoordinate}
          setPlaceCoordinate={setPlaceCoordinate}
          pinnedLocations={pinnedLocations}
          setPinnedLocations={setPinnedLocations}
        />
      </Box>
    </Stack>
  );
}
