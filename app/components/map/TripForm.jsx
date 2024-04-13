import React from "react";
import PlaceSearch from "./PlaceSearch";

export default function TripForm({ placeCoordinates, setPlaceCoordinates }) {
  return (
    <form className="">
      <PlaceSearch
        placeCoordinates={placeCoordinates}
        setPlaceCoordinates={setPlaceCoordinates}
      />
      <button>Add My Place</button>
    </form>
  );
}
