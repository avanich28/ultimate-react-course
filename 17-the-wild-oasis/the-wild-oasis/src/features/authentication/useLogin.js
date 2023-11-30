import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Topic: Authentication: User Login With Supabase (3)
export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      // Topic: Authorization: Protecting Routes
      // IMPT Allow us to manually set data into the cache
      // Topic: Fixing an Important Bug
      // console.log(user); // {user: {…}, session: {…}}
      queryClient.setQueryData(["user"], user.user); // BUG
      navigate("/dashboard", { replace: true }); // IMPT replace that we were earlier
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
