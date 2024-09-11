"use client";
import React from "react";
import TripForm from "./TripForm";
import Map from "./Map";
import { useState } from "react";

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
    <div className="flex">
      <div className="w-1/5">
        <TripForm
          placeCoordinate={placeCoordinate}
          setPlaceCoordinate={setPlaceCoordinate}
          pinnedLocations={pinnedLocations}
          setPinnedLocations={setPinnedLocations}
        />
      </div>
      <div className="w-4/5">
        <Map
          placeCoordinate={placeCoordinate}
          setPlaceCoordinate={setPlaceCoordinate}
          pinnedLocations={pinnedLocations}
          setPinnedLocations={setPinnedLocations}
        />
      </div>
    </div>
  );
}
