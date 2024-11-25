"use client";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/context/postContext";

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

  const handleMarkerMouseEnter = (id: string) => {
    setActiveMarker(id);
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
    height: "30vh",
    borderRadius: "10px",
  };

  const centerCoordinate = {
    lat: 41.0085,
    lng: 28.98,
  };

  const options = {
    mapId: process.env.NEXT_PUBLIC_MAP_ID as string,
    mapTypeControl: false,
    streetViewControl: false,
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

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={
        (placeCoordinate || centerCoordinate) as google.maps.LatLngLiteral
      }
      zoom={13}
      options={options}
    >
      {placeCoordinate && (
        <MarkerF
          position={{
            lat: placeCoordinate.latitude,
            lng: placeCoordinate.longitude,
          }}
        />
      )}
      {pinnedLocations.map((place) => (
        <MarkerF
          key={place.id}
          onMouseOver={() => handleMarkerMouseEnter(place.id)}
          onMouseOut={handleMarkerMouseLeave}
          icon={{
            url: "/dot.svg",
            anchor: new google.maps.Point(15, 15),
            scaledSize: new window.google.maps.Size(30, 30),
          }}
          position={{ lat: place.latitude, lng: place.longitude }}
        >
          {activeMarker === place.id && (
            <InfoWindow
              onLoad={() => handleInfoWindowLoad(place.id)}
              position={{ lat: place.latitude, lng: place.longitude }}
            >
              <div
                className="flex flex-col space-y-3 bg-gray-500 h-32"
                onMouseOver={handleInfoWindowMouseEnter}
                onMouseOut={handleInfoWindowMouseLeave}
              >
                {posts?.map((post) => (
                  <p key={post.id} className="bg-green-300">
                    {post.title}
                  </p>
                ))}
                <p>{place.name}</p>
                <button
                  className="bg-blue-700 w-full"
                  onClick={() => handleAddPost(place.id)}
                >
                  Add blog post
                </button>
                <button
                  className="bg-red-700 w-full"
                  onClick={() => handleDelete(place.id)}
                >
                  Delete place
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
