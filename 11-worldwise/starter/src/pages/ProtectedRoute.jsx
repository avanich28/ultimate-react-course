import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/fakeAuthContext";

// Topic: Adding Fake Authentication: Protecting a Route 🐬
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      console.log("II");
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  console.log("I");

  // return children; // BUG
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
