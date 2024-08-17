"use client";
import React, { useState } from "react";
import PlaceSearch from "./PlaceSearch";
import { Button } from "@/components/ui/button";

export default function TripForm({
  placeCoordinate,
  setPlaceCoordinate,
  setPinnedLocations,
  pinnedLocations,
}) {
  const [place, setPlace] = useState(null);

  const handleSubmit = async (e) => {
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
        setPinnedLocations((prevLocations) => [...prevLocations, data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-red-500 h-full">
      <form onSubmit={handleSubmit}>
        <PlaceSearch
          setPlace={setPlace}
          placeCoordinate={placeCoordinate}
          setPlaceCoordinate={setPlaceCoordinate}
        />
        <Button type="submit" variant="accent">
          Add to my place
        </Button>
      </form>
    </div>
  );
}
