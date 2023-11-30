import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Topic: Checking in a Booking (5)
export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    // Topic: Adding Optional Breakfast (2)
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    // IMPT We can receive data from onSuccess
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      // IMPT Like passing queryKey, this will invalidate all query in the page. (Don't have to remember any query keys)
      queryClient.invalidateQueries({ active: true });
      navigate("/"); // /dashboard
    },

    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkin, isCheckingIn };
}
