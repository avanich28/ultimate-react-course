// Topic: Creating Our first App with Vite: 'WorldWise'
// Install npm and setup eslint

// Topic: Implementing Main Pages and Routes
// npm i react-router-dom@6

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

const BASE_URL = "http://localhost:8000";

function App() {
  // Topic: Implementing the Cities List (2)
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <div>
      {/* Stay the same */}
      {/* <h1>Hello Router!</h1> */}

      {/* 2 ways for defining routes
       1. Declarative way */}
      <BrowserRouter>
        <Routes>
          {/* Display when matches the route */}
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />

          {/* Topic: Nested Routes and Index Route (1) 💥 */}
          <Route path="app" element={<AppLayout />}>
            {/* IMPT Index route is the default child route that is going to be matched if none of these other routes here matches. -> <Outlet /> */}
            {/* Topic: Programmatic Navigation with <Navigate /> */}
            <Route index element={<Navigate replace to="cities" />} />
            {/* index hit -> redirect to the 'cities' route -> (below route) */}
            {/* 'replace' -> replace the current element in the history stack */}
            {/* This is an declarative way while navigate function is an imperative way. */}

            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            />

            {/* Topic: Dynamic Routes with URL Parameters
            3 steps 
            1) Create a new route 
            2) Link to that route 
            3) In that route, read the state from the URL 
            */}
            <Route path="cities/:id" element={<City />} />

            <Route
              path="countries"
              element={<CountryList cities={cities} isLoading={isLoading} />}
            />
            <Route path="form" element={<Form />} />
          </Route>

          {/* The star will basically be matched if none of the other routes are matched or any URL are not matched by our routes. */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// Topic: Routing and Single-Page Applications (SPAs)
// In slide

// Topic: Styling Options for React Applications
// In slide

// Topic: Storing state in thr URL
// In slide
