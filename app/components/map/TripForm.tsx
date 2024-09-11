import React, { useState } from "react";
import { Button, Container, Paper, Group } from "@mantine/core";
import PlaceSearch from "./PlaceSearch";

type PinnedLocation = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
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
    <Container
      style={{ backgroundColor: "#f5f5f5", height: "100%", padding: "20px" }}
    >
      <Paper style={{ backgroundColor: "#fff", borderRadius: "8px" }}>
        <form onSubmit={handleSubmit}>
          <PlaceSearch
            setPlace={setPlace}
            placeCoordinate={placeCoordinate}
            setPlaceCoordinate={setPlaceCoordinate}
          />
          <Group style={{ marginTop: "20px" }}>
            <Button type="submit" color="blue" variant="filled">
              Add to my place
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
