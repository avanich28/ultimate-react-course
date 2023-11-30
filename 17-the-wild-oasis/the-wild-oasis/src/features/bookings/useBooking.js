import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

// Topic: Building the Single Booking Page (3)
export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    // BUG Don't forget to put bookingId to refetch
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    // IMPT By default, React Query try to fetch data 3 times in case that it fails in the beginning. But, it doesn't make sense bcs this failure means the data didn't exist in the first place, so we don't need to retry again.
    retry: false,
  });

  return { isLoading, booking, error };
}
