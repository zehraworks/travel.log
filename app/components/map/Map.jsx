"use client";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";

export default function Map({
  placeCoordinate,
  setPlaceCoordinate,
  pinnedLocations,
  setPinnedLocations,
}) {
  const [activeMarker, setActiveMarker] = useState(null);
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);

  useEffect(() => {
    async function fetchPinnedLocations() {
      try {
        const response = await fetch("/api/pinned-location/getPlaces");
        const data = await response.json();

        console.log("Fetched pinned locations:", data);
        setPinnedLocations(data.pinnedLocations || []);
      } catch (error) {
        console.error("Failed to fetch pinned locations:", error);
      }
    }

    fetchPinnedLocations();
  }, []);

  const handleMarkerMouseEnter = (index) => {
    setActiveMarker(index);
    setInfoWindowVisible(true);
  };

  const handleMarkerMouseLeave = () => {
    if (!infoWindowVisible) {
      setActiveMarker(null);
    }
  };

  const handleInfoWindowMouseEnter = () => {
    setInfoWindowVisible(true);
  };

  const handleInfoWindowMouseLeave = () => {
    setInfoWindowVisible(false);

    if (!infoWindowVisible) {
      setActiveMarker(null);
    }
  };

  const containerStyle = {
    width: "100%",
    height: "80vh",
  };

  const centerCoordinate = {
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `/api/pinned-location/deletePlace?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        console.error("Failed to delete place");
        return;
      }

      setPinnedLocations((prev) => prev.filter((place) => place.id !== id));
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={placeCoordinate ? placeCoordinate : centerCoordinate}
      zoom={13}
      options={options}
    >
      {placeCoordinate && (
        <MarkerF
          position={{ lat: placeCoordinate.lat, lng: placeCoordinate.lng }}
        />
      )}
      {pinnedLocations &&
        pinnedLocations.map((place) => (
          <MarkerF
            key={place?.id}
            onMouseOver={() => handleMarkerMouseEnter(place?.id)}
            onMouseOut={handleMarkerMouseLeave}
            icon={{
              url: "/dot.svg",
              anchor: new google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            position={{ lat: place?.latitude, lng: place?.longitude }}
          >
            {activeMarker === place?.id && (
              <InfoWindow
                onMouseOver={handleInfoWindowMouseEnter}
                onMouseOut={handleInfoWindowMouseLeave}
                position={{ lat: place?.latitude, lng: place?.longitude }}
              >
                <div className="flex flex-col">
                  {place?.name}
                  <button
                    className="bg-red-700"
                    onClick={() => handleDelete(place.id)}
                  >
                    delete place
                  </button>
                </div>
              </InfoWindow>
            )}
          </MarkerF>
        ))}
    </GoogleMap>
  ) : (
    <></>
  );
}
