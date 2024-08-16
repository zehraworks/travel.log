"use client";
import React from "react";
import TripForm from "./TripForm";
import Map from "./Map";
import { useState } from "react";

export default function MapComponent() {
  const [placeCoordinates, setPlaceCoordinates] = useState(null);

  return (
    <div className="flex">
      <div className="w-1/5">
        <TripForm
          placeCoordinates={placeCoordinates}
          setPlaceCoordinates={setPlaceCoordinates}
        />
      </div>
      <div className="w-4/5">
        <Map
          placeCoordinates={placeCoordinates}
          setPlaceCoordinates={setPlaceCoordinates}
        />
      </div>
    </div>
  );
}
