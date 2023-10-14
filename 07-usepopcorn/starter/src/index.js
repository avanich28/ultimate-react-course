import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import "./index.css";
import App from "./App.js";

// import StarRating from "./StarRating";

// Cannot touch internal state, so we need to the outside state to get internal state in order to pass movieRating!
function Test() {
  // Rate outside component 🐔
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      {/* <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars</p> */}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating size={24} color="red" className="test" defaultRating={3} />

    <Test /> */}
  </React.StrictMode>
);
