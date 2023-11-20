import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './ui/Home';
import Error from './ui/Error';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import { action as updateOrderAction } from './features/order/UpdateOrder';
import AppLayout from './ui/AppLayout';

// Topic: A New Way of Implementing Routes
// NOTE npm i react-router-dom@6
// https://reactrouter.com/en/main/routers/create-browser-router
// NOTE Route Router 6.4 is an imperative way, declaring the router outside the JSX and using the JS array right here in order to enable data fetching or data loading with React Router! 🔥
// NOTE In Worldwise, we declare route in declarative way. But we can't use to load data or to submit data using forms.
// NOTE If we want to use the new powerful APIs like data loaders, data actions, or data features. We need to create a new router using this new syntax.
const router = createBrowserRouter([
  {
    // Topic: Building the App Layout (2)
    // Parent route
    element: <AppLayout />,
    // Topic: Handling Errors With Error Elements (1) ⛔️
    // (2) in Error.jsx
    // Put in parent route
    errorElement: <Error />,
    // Define child routes
    // Call child route by using <Outlet />
    children: [
      {
        path: '/',
        element: <Home />,
      },
      // Topic: Fetching Data With React Router "Loaders": Pizza Menu (1)
      // (2) in Menu.jsx
      // NOTE Not only matching component to URL in the browser, but also provide the data that is necessary for each page.
      // 1) Create loader
      // 2) Provide the loader
      // 3) Provide the data to the page
      {
        path: '/menu',
        // If there are error when loading menu, we can render <Error />
        // Error will bubble up to the parent route.
        element: <Menu />,
        loader: menuLoader, // Step 2
        errorElement: <Error />, // ⛔️ error pop up within the layout
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/new', // connect url with the action
        element: <CreateOrder />,
        // Topic: Writing Data With React Router "Actions" (2) 🍔
        action: createOrderAction, // use with <Form />
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        // Topic: Fetching Orders (4)
        loader: orderLoader,
        errorElement: <Error />,
        // // Topic: Updating Data Without Navigation (3)
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// Topic: Setting Up a New Project: "Fast React Pizza Co."
// In text edit

// Topic: Application Planning
// In slide

// Topic: Setting Up a Professional File Structure
// In Udemy notes

////////////////////////

// Topic: What is Tailwind CSS?
// In slide

// Topic: Setting Up Tailwind CSS
// (use version 3)
// https://tailwindcss.com/docs/guides/vite
// npm install -D tailwindcss@3 postcss autoprefixer
// npx tailwindcss init -p

// setup tailwind.config.js and prettier.config.cjs
// add in index.css
// @tailwind base;
// @tailwind components;
// @tailwind utilities;

// https://tailwindcss.com/docs/customizing-colors
