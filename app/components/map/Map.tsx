"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/context/postContext";
import { ActionIcon, Box, Button, Text, Title, Tooltip } from "@mantine/core";
import { FaNoteSticky, FaTrashCan } from "react-icons/fa6";
import PinCard from "./PinCard";

import { useMediaQuery } from "@mantine/hooks";

type PlaceCoordinate = {
  lat: number;
  lng: number;
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

type MapProps = {
  placeCoordinate: PlaceCoordinate | null;
  setPlaceCoordinate: React.Dispatch<
    React.SetStateAction<PlaceCoordinate | null>
  >;
  pinnedLocations: PinnedLocation[];
  setPinnedLocations: React.Dispatch<React.SetStateAction<PinnedLocation[]>>;
};

export default function Map({
  placeCoordinate,
  setPlaceCoordinate,
  pinnedLocations,
  setPinnedLocations,
}: MapProps) {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);
  const [hoveredPlaceCoordinate, setHoveredPlaceCoordinate] =
    useState<PlaceCoordinate | null>(null);

  const [mapStyleId, setMapStyleId] = useState<string | null>(null);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  console.log("prefersDark", mapStyleId);

  useEffect(() => {
    if (prefersDarkMode) {
      setMapStyleId(process.env.NEXT_PUBLIC_DARK_STYLE_ID as string);
    } else {
      setMapStyleId(process.env.NEXT_PUBLIC_LIGHT_STYLE_ID as string);
    }
  }, [prefersDarkMode]);

  const { posts, setValue } = useGlobal();
  const router = useRouter();

  useEffect(() => {
    async function fetchPinnedLocations() {
      try {
        const response = await fetch("/api/pinned-location/getPlaces");
        const data = await response.json();
        setPinnedLocations(data.pinnedLocations || []);
      } catch (error) {
        console.error("Failed to fetch pinned locations:", error);
      }
    }

    fetchPinnedLocations();
  }, [setPinnedLocations]);

  const handleMarkerMouseEnter = (place: PinnedLocation) => {
    setActiveMarker(place.id);
    setHoveredPlaceCoordinate({
      lat: place.latitude,
      lng: place.longitude,
    });
    setInfoWindowVisible(true);
  };

  const handleMarkerMouseLeave = () => {
    setHoveredPlaceCoordinate(null);
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
    height: "30vh",
    borderRadius: "10px",
  };

  const options = {
    mapId: process.env.NEXT_PUBLIC_MAP_ID as string,
    mapTypeControl: false,
    streetViewControl: false,
    styleId: mapStyleId,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const handleDelete = async (id: string) => {
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

  const handleAddPost = (placeId: string) => {
    router.push(`/post/${placeId}`);
  };

  const handleInfoWindowLoad = async (placeId: string) => {
    try {
      const response = await fetch(`/api/post/getPosts?placeId=${placeId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }
      const data = await response.json();
      setValue({ posts: data?.posts });
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const currentCenter = useMemo(() => {
    let center;

    if (hoveredPlaceCoordinate) {
      center = {
        lat: hoveredPlaceCoordinate.lat,
        lng: hoveredPlaceCoordinate.lng,
      };
    } else if (placeCoordinate) {
      center = {
        lat: placeCoordinate.lat,
        lng: placeCoordinate.lng,
      };
    } else {
      center = { lat: 41.0085, lng: 28.98 };
    }

    return center;
  }, [placeCoordinate, hoveredPlaceCoordinate]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentCenter}
      zoom={13}
      options={options}
    >
      {placeCoordinate && (
        <MarkerF
          position={{
            lat: isFinite(placeCoordinate.lat) ? placeCoordinate.lng : 0,
            lng: isFinite(placeCoordinate.lng) ? placeCoordinate.lng : 0,
          }}
        />
      )}
      {pinnedLocations.map((place) => (
        <MarkerF
          key={place.id}
          onMouseOver={() => handleMarkerMouseEnter(place)}
          onMouseOut={handleMarkerMouseLeave}
          icon={{
            url: "/map-pin.svg",
            anchor: new google.maps.Point(15, 15),
            scaledSize: new window.google.maps.Size(30, 30),
          }}
          position={{ lat: place.latitude, lng: place.longitude }}
        >
          {activeMarker === place.id && (
            <InfoWindow
              options={{ maxWidth: 300 }}
              onLoad={() => handleInfoWindowLoad(place.id)}
              position={{ lat: place.latitude, lng: place.longitude }}
            >
              <>
                <PinCard
                  posts={posts}
                  place={place}
                  handleInfoWindowMouseEnter={handleInfoWindowMouseEnter}
                  handleInfoWindowMouseLeave={handleInfoWindowMouseLeave}
                  handleAddPost={handleAddPost}
                  handleDelete={handleDelete}
                />
              </>
            </InfoWindow>
          )}
        </MarkerF>
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}
