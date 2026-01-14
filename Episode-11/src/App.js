import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.js";
import Body from "./components/Body.js";
// import About from "./components/About.js";
import Contacts from "./components/Contacts.js";
import Cart from "./components/Cart.js";
import Error from "./components/Error.js";
// import Grocery from "./components/Grocery.js";
import RestaurantMenu from "./components/RestaurantMenu.js";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"; // Add Outlet import
import "./index.css";
import Footer from "./components/Footer.js";
import UserContext from "./utils/UserContext.js";

// chunking
// code splitting
// dynamic bundling
// lazy loading
// on demand loading
// dynamic import

const Grocery = lazy(() => import("./components/Grocery.js")); // Lazy load Grocery component

const About = lazy(() => import("./components/About.js")); // Lazy load About component

// AppLayout component with Outlet for children routes
const AppLayout = () => {
  const [userName, setUserName] = useState();

  // Authentication logic can be added here
  useEffect(() => {
    // Make an API call and send username and password
    const data = {
      name: "Kaushinder Singh Raghav",
    };
    setUserName(data.name);
  }, []);

  return (
    <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
      <div className="app">
        <UserContext.Provider value={{ loggedInUser: "Kaushinder Raghav" }}>
          <Header />
        </UserContext.Provider>
        <Outlet />{" "}
        {/* Replace <Body /> with <Outlet /> to render child routes */}
        <Footer />
      </div>
    </UserContext.Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // Header + Body
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <Contacts />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
    ], // Add children routes here
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
