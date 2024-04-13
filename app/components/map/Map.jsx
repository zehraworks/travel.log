"use client";
import React from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

export default function Map({ placeCoordinates, setPlaceCoordinates }) {
  const containerStyle = {
    width: "100%",
    height: "80vh",
  };

  const centerCoordinates = {
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
      center={placeCoordinates ? placeCoordinates : centerCoordinates}
      zoom={13}
      options={options}
    >
      {placeCoordinates && (
        <MarkerF
          position={{ lat: placeCoordinates.lat, lng: placeCoordinates.lng }}
        />
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}
