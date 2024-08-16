"use client";
import usePlacesAutocomplete, {
  getDetails,
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { Input } from "@/components/ui/input";

export default function PlaceSearch({
  placeCoordinates,
  setPlaceCoordinates,
  setPlace,
}) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description, place_id }) =>
    () => {
      getDetails({
        placeId: place_id,
      })
        .then((details) => {
          setPlace(details);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });

      setValue(description, false);
      clearSuggestions();
      getGeocode({ address: description }).then((results) => {
        const coordinates = getLatLng(results[0]);
        setPlaceCoordinates(coordinates);
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          className="bg-blue-100 my-1 cursor-pointer"
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref}>
      <Input
        value={value}
        onChange={handleInput}
        placeholder="to where?"
        variant="transparent"
        disabled={!ready}
      />
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
}
