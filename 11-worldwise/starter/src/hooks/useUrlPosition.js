import { useSearchParams } from "react-router-dom";

// Topic: Fetching City Data in the Form (1) 🍊
export function useUrlPosition() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}
