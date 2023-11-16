import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // npm i react-redux
import "./index.css";
import App from "./App";

import store from "./store";

// store.dispatch({ type: "account/deposit", payload: 250 });
// console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Topic: Back to React! Connecting our Redux App With React (1) */}
    {/* This is like Context API */}
    <Provider store={store}>
      {/* Now, App knows the Redux store, so it can read and dispatch from the store */}
      <App />
    </Provider>
  </React.StrictMode>
);
