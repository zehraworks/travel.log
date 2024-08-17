"use client";
import React from "react";
import TripForm from "./TripForm";
import Map from "./Map";
import { useState } from "react";

export default function MapComponent() {
  const [placeCoordinate, setPlaceCoordinate] = useState(null);
  const [pinnedLocations, setPinnedLocations] = useState([]);

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
