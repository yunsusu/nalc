import axios from "axios";

export function getPlaceNameByOSM(latitude, longitude) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

  return axios
    .get(url)
    .then((response) => {
      return response.data.display_name; // 전체 주소
    })
    .catch((error) => {
      console.error("Error during OSM geocoding:", error);
      return "Location name not found";
    });
}
