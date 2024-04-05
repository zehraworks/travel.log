"use client";
import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

export default function Map() {
  const containerStyle = {
    width: "100%",
    height: "80vh",
  };

  const center = {
    lat: 41.0085,
    lng: 28.98,
  };

  const options = {
    mapId: process.env.NEXT_PUBLIC_MAP_ID,
    mapTypeControl: false,
    streetViewControl: false,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      options={options}
    ></GoogleMap>
  ) : (
    <></>
  );
}
