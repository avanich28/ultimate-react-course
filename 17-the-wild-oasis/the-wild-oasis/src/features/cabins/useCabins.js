import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

// Topic: Abstracting React Query Into Custom Hooks 🍿
export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    // Fn need to return the promise
    // We can perform -> fetch("dfefefe")
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}
