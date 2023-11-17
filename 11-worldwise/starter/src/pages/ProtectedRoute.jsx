import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";

// Topic: Adding Fake Authentication: Protecting a Route 🐬

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // BUG http://localhost:5174/app/ (http://localhost:5174/app/cities)
  useEffect(
    function () {
      console.log("II", isAuthenticated);
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  console.log("I");

  // return children; // BUG
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
