"use client";
import React, { useState } from "react";
import PlaceSearch from "./PlaceSearch";
import { Button } from "@/components/ui/button";

export default function TripForm({ placeCoordinates, setPlaceCoordinates }) {
  const [place, setPlace] = useState(null);

  console.log("plaaaa", place);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { lat, lng } = placeCoordinates;

    try {
      const res = await fetch("/api/pinned-location/addPlace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Example Location",
          desc: "A description of the place",
          latitude: lat,
          longitude: lng,
          status: "COMPLETED",
          continent: "EUROPE",
        }),
      });

      if (!res.ok) {
        console.log("resoooo", res);
        throw new Error("Failed to add pinned location");
      }

      const data = await res.json();
      console.log("Pinned location added:", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-red-500 h-full">
      <form onSubmit={handleSubmit}>
        <PlaceSearch
          setPlace={setPlace}
          placeCoordinates={placeCoordinates}
          setPlaceCoordinates={setPlaceCoordinates}
        />
        <Button type="submit" variant="accent">
          Add to my place
        </Button>
      </form>
    </div>
  );
}
