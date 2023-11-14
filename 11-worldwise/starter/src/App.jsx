// Topic: Creating Our first App with Vite: 'WorldWise'
// Install npm and setup eslint

// Topic: Implementing Main Pages and Routes
// npm i react-router-dom@6

import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";

// Topic: Optimizing Bundle Size With Code Splitting 🍔
// React will split the bundle when they see this lazy.
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// dist/assets/index-ba87c72d.css   31.32 kB │ gzip:   5.24 kB
// dist/assets/index-e1785f82.js   528.13 kB │ gzip: 149.57 kB

function App() {
  // Move state to CitiesContext.jsx 🌈

  return (
    <AuthProvider>
      <CitiesProvider>
        {/* Stay the same */}
        {/* <h1>Hello Router!</h1> */}

        {/* 2 ways for defining routes
       1. Declarative way */}
        <BrowserRouter>
          {/* 🍔 Suspense is a concurrent feature that is part of modern React and that allows certain components to suspend which means that it allows them to wait for sth to happen.*/}
          {/* Those lazy will gonna be suspended while they're loading */}
          {/* fallback is Suspense build-in. -> fill loading indicator */}
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              {/* Display when matches the route */}
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />

              {/* Topic: Nested Routes and Index Route (1) 💥 */}
              <Route
                path="app"
                element={
                  // 🐬 check the user currently log in or not
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* IMPT Index route is the default child route that is going to be matched if none of these other routes here matches. -> <Outlet /> */}
                {/* Topic: Programmatic Navigation with <Navigate /> */}
                <Route index element={<Navigate replace to="cities" />} />
                {/* index hit -> redirect to the 'cities' route -> (below route) */}
                {/* 'replace' -> replace the current element in the history stack */}
                {/* This is an declarative way while navigate function is an imperative way. */}

                <Route path="cities" element={<CityList />} />

                {/* Topic: Dynamic Routes with URL Parameters
            3 steps 
            1) Create a new route 
            2) Link to that route 
            3) In that route, read the state from the URL 
            */}
                <Route path="cities/:id" element={<City />} />

                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>

              {/* The star will basically be matched if none of the other routes are matched or any URL are not matched by our routes. */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;

// Topic: Routing and Single-Page Applications (SPAs)
// In slide

// Topic: Styling Options for React Applications
// In slide

// Topic: Storing state in thr URL
// In slide

// Topic: Don't Optimize Prematurely!
// In slide

// Topic: useEffect Rules and Best Practices
// In slide
