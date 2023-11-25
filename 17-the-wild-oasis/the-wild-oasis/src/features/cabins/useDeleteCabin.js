import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

// Topic: Abstracting React Query Into Custom Hooks 🍿
// Move from CabinRow.jsx
export function useDeleteCabin() {
  // Topic: Mutations: Deleting a Cabin (2)
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    // mutate(cabinId) -> call deleteCabin fn
    mutationFn: deleteCabinApi,
    // IMPT Tell React Query what to do as soon as the mutation was successful
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      // Automatically refresh the data - invalidate the cache
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    // Receive an error from mutationFn
    // Topic: Displaying Toasts (Notifications) (2)
    onError: (err) => toast.error(err.message), // Cabin could not be deleted
  });

  return { isDeleting, deleteCabin };
}
