import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

// Topic: Setting Up React Query 🌻
// npm i @tanstack/react-query@4
// npm i @tanstack/react-query-devtools@4
// Set up the cache behind the scene
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // The amount of time that the data in the cache will stay fresh or stay valid until it is re-fetched again.
      // NOTE Define how long the data to become stale
      // fresh 1 minute -> stale (-> fetching -> fresh)
      // staleTime: 60 * 1000, // 1 minute
      staleTime: 0,
    },
  },
});

// Topic: Setting Up Pages and Routes
function App() {
  return (
    <DarkModeProvider>
      {/* 🌻 */}
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            {/* Topic: Authorization: Protecting Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Navigate replace to="dashboard" />}
              ></Route>
              <Route path="dashboard" element={<Dashboard />}></Route>
              <Route path="bookings" element={<Bookings />}></Route>
              <Route path="bookings/:bookingId" element={<Booking />}></Route>
              <Route path="checkin/:bookingId" element={<Checkin />}></Route>
              <Route path="cabins" element={<Cabins />}></Route>
              <Route path="users" element={<Users />}></Route>
              <Route path="settings" element={<Settings />}></Route>
              <Route path="account" element={<Account />}></Route>
            </Route>

            <Route path="login" element={<Login />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
        {/* Topic: Displaying Toasts (Notifications) (1) - alert */}
        {/* (2) in CabinRow.jsx 
          (3) in AppLayout.jsx */}
        {/* NOTE npm i react-hot-toast */}
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
