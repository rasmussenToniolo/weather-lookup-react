import { LatLng } from "leaflet";

export async function fetchData(coords: LatLng) {
  console.log(coords);

  const res = await fetch('');

  return {text: 'hi'};
}