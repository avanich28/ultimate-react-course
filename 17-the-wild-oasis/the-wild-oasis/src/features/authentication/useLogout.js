import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

// Topic: User Logout
export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    // Go back to login page
    onSuccess: () => {
      // IMPT prevent hacker
      queryClient.removeQueries();
      navigate(
        "/login",
        // IMPT replace that we were earlier
        // Place in log in/out
        { replace: true }
      );
    },
  });

  return { logout, isLoading };
}
