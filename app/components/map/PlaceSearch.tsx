"use client";

import usePlacesAutocomplete, {
  getDetails,
  getGeocode,
  getLatLng,
  Suggestion,
} from "use-places-autocomplete";
import { useState, useCallback, ChangeEvent } from "react";
import { TextInput, Menu, MenuItem, Paper, Avatar } from "@mantine/core";

type PlaceSearchProps = {
  placeCoordinate: { lat: number; lng: number } | null;
  setPlaceCoordinate: (coordinates: { lat: number; lng: number }) => void;
  setPlace: (place: any) => void;
};

export default function PlaceSearch({
  placeCoordinate,
  setPlaceCoordinate,
  setPlace,
}: PlaceSearchProps) {
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

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setOpen(true);
  };

  const handleSelect = useCallback(
    ({ description, place_id }: Suggestion) =>
      async () => {
        try {
          const details = await getDetails({ placeId: place_id });
          setPlace(details);

          setValue(description, false);
          clearSuggestions();
          const results = await getGeocode({ address: description });
          const coordinates = await getLatLng(results[0]);
          setPlaceCoordinate(coordinates);
        } catch (error) {
          console.log("Error: ", error);
        }
        setOpen(false);
      },
    [clearSuggestions, setPlace, setPlaceCoordinate, setValue]
  );

  const renderSuggestions = () =>
    data.map((suggestion: Suggestion) => {
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
    <>
      <Paper
        style={{
          display: "flex",
          width: "100%",
          borderRadius: "50px 10px 10px 50px",
        }}
      >
        <Avatar h={60} w={65} />
        <TextInput
          variant="unstyled"
          style={{
            height: "60px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "10px",
            width: "100%",
          }}
          value={value}
          onChange={handleInput}
          placeholder="to where?"
          disabled={!ready}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
        />
      </Paper>
      {open && status === "OK" && (
        <Paper style={{ position: "absolute", zIndex: 10, width: "100%" }}>
          <Menu
            opened={open}
            onClose={() => setOpen(false)}
            closeOnClickOutside
            withArrow
          >
            {renderSuggestions()}
          </Menu>
        </Paper>
      )}
    </>
  );
}
