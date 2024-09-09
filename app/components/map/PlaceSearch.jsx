"use client";

import usePlacesAutocomplete, {
  getDetails,
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useState, useCallback } from "react";
import { TextInput, Menu, MenuItem, Paper } from "@mantine/core";

export default function PlaceSearch({
  placeCoordinate,
  setPlaceCoordinate,
  setPlace,
}) {
  const [open, setOpen] = useState(false);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const handleInput = (e) => {
    setValue(e.target.value);
    setOpen(true);
  };

  const handleSelect = useCallback(
    ({ description, place_id }) =>
      async () => {
        try {
          const details = await getDetails({ placeId: place_id });
          setPlace(details);

          setValue(description, false);
          clearSuggestions();
          const results = await getGeocode({ address: description });
          const coordinates = getLatLng(results[0]);
          setPlaceCoordinate(coordinates);
        } catch (error) {
          console.log("Error: ", error);
        }
        setOpen(false);
      },
    [
      clearSuggestions,
      getDetails,
      getGeocode,
      getLatLng,
      setPlace,
      setPlaceCoordinate,
      setValue,
    ]
  );

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <MenuItem
          key={place_id}
          onClick={handleSelect(suggestion)}
          style={{ cursor: "pointer" }}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </MenuItem>
      );
    });

  return (
    <div>
      <TextInput
        value={value}
        onChange={handleInput}
        placeholder="to where?"
        variant="filled"
        disabled={!ready}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)} // Delay to allow click events
      />
      {open && status === "OK" && (
        <Paper style={{ position: "absolute", zIndex: 10, width: "100%" }}>
          <Menu
            size="sm"
            opened={open}
            onClose={() => setOpen(false)}
            closeOnClickOutside
            withArrow
          >
            {renderSuggestions()}
          </Menu>
        </Paper>
      )}
    </div>
  );
}
