import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

// Topic: Authorization: Protecting Routes
export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  // BUG First user is null, se we need to modify code in useLogin.js (user.user)
  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
