"use client";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import { useRouter } from "next/navigation";

export default function Map({
  placeCoordinate,
  setPlaceCoordinate,
  pinnedLocations,
  setPinnedLocations,
}) {
  const [activeMarker, setActiveMarker] = useState(null);
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);
  const [postTitle, setPostTitle] = useState(null);

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

  const handleAddPost = async (placeId) => {
    router.push(`/post/${placeId}`);
  };

  const handleInfoWindowLoad = async (placeId) => {
    console.log("mamama", placeId);
    try {
      const response = await fetch(`/api/post/getPost?placeId=${placeId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }
      const data = await response.json();
      console.log("Post Data:", data);
      setPostTitle(data?.post[0].title);
    } catch (error) {
      console.error("Error fetching post:", error);
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
                onLoad={() => handleInfoWindowLoad(place?.id)}
                onMouseOver={handleInfoWindowMouseEnter}
                onMouseOut={handleInfoWindowMouseLeave}
                position={{ lat: place?.latitude, lng: place?.longitude }}
              >
                <div className="flex flex-col space-y-3 bg-gray-500 h-32">
                  <p className="bg-green-400">{postTitle}</p>
                  <p1>{place?.name}</p1>
                  <button
                    className="bg-blue-700 w-full"
                    onClick={() => handleAddPost(place.id)}
                  >
                    add blog post
                  </button>
                  <button
                    className="bg-red-700 w-full"
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
