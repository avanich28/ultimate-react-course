import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import Loader from "./Loader";

// Topic: Building the App Layout (1)
function AppLayout() {
  // Topic: Displaying a Loading Indicator (1)
  // (2) in Loader.jsx
  // Universal data
  const navigation = useNavigation();
  // console.log(navigation);
  // Loading (loader: menuLoader) -> state: 'loading'
  // Finish loading -> state: 'idle
  const isLoading = navigation.state === "loading";

  return (
    <div className="layout">
      {isLoading && <Loader />}

      <Header />

      <main>
        {/* For calling child route */}
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
