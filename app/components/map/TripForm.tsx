import React, { useState } from "react";
import { Button, Container, Paper, Group, Avatar, Flex } from "@mantine/core";
import PlaceSearch from "./PlaceSearch";
import Map from "./Map";

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

type TripFormProps = {
  placeCoordinate: any;
  setPlaceCoordinate: React.Dispatch<React.SetStateAction<any>>;
  pinnedLocations: PinnedLocation[];
  setPinnedLocations: React.Dispatch<React.SetStateAction<PinnedLocation[]>>;
};

export default function TripForm({
  placeCoordinate,
  setPlaceCoordinate,
  pinnedLocations,
  setPinnedLocations,
}: TripFormProps) {
  const [place, setPlace] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { lat, lng } = placeCoordinate;

    try {
      const res = await fetch("/api/pinned-location/addPlace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: place?.name,
          latitude: lat,
          longitude: lng,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.log("Error:", error);
      } else {
        const data = await res.json();
        setPinnedLocations((prevLocations: PinnedLocation[]) => [
          ...prevLocations,
          data,
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex className="bg-[#FCF1EB] p-5 w-full rounded-lg">
      <form onSubmit={handleSubmit} className="w-full">
        <PlaceSearch
          setPlace={setPlace}
          placeCoordinate={placeCoordinate}
          setPlaceCoordinate={setPlaceCoordinate}
        />
        <Group style={{ marginTop: "20px" }}>
          <Button type="submit" color="#285F98" variant="filled">
            Add to my place
          </Button>
          <Map
            placeCoordinate={placeCoordinate}
            setPlaceCoordinate={setPlaceCoordinate}
            pinnedLocations={pinnedLocations}
            setPinnedLocations={setPinnedLocations}
          />
        </Group>
      </form>
    </Flex>
  );
}
