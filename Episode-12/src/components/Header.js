import { LOGO_URL } from "../utils/constant";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
// Icons
import {
  FaHome,
  FaInfoCircle,
  FaPhoneAlt,
  FaShoppingCart,
  FaStore,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdOnlinePrediction } from "react-icons/md";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);

  // console.log(loggedInUser);

  // Selector to get cart items from Redux store can be added here
  // Subscribing to the store to store using useSelector hook

  const cartItems = useSelector((store) => store.cart.items);
  console.log("Cart Items in Header:", cartItems);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img
            src={LOGO_URL}
            alt="Food Logo"
            className="h-12 w-12 rounded-full border-2 border-orange-500"
          />
          <span className="text-xl font-bold text-gray-800">
            Food<span className="text-orange-500">Villa</span>
          </span>
        </div>

        {/* NAVIGATION */}
        <nav>
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            
            {/* Online Status */}
            <li className="flex items-center gap-1">
              <MdOnlinePrediction
                className={onlineStatus ? "text-green-500" : "text-red-500"}
              />
              {onlineStatus ? "Online" : "Offline"}
            </li>

            <li>
              <Link to="/" className="flex items-center gap-1 hover:text-orange-500">
                <FaHome /> Home
              </Link>
            </li>

            <li>
              <Link to="/about" className="flex items-center gap-1 hover:text-orange-500">
                <FaInfoCircle /> About
              </Link>
            </li>

            <li>
              <Link to="/contact" className="flex items-center gap-1 hover:text-orange-500">
                <FaPhoneAlt /> Contact
              </Link>
            </li>

            <li>
              <Link to="/grocery" className="flex items-center gap-1 hover:text-orange-500">
                <FaStore /> Grocery
              </Link>
            </li>

            <li>
              <Link to="/cart" className="flex items-center gap-1 hover:text-orange-500">
                <FaShoppingCart /> Cart - ({cartItems.length} items)
              </Link>
            </li>

            {/* LOGIN / LOGOUT */}
            <li>
              <button
                onClick={() =>
                  setBtnNameReact(
                    btnNameReact === "Login" ? "Logout" : "Login"
                  )
                }
                className="flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-white shadow hover:bg-orange-600 transition"
              >
                {btnNameReact === "Login" ? (
                  <>
                    <FaSignInAlt /> Login
                  </>
                ) : (
                  <>
                    <FaSignOutAlt /> Logout
                  </>
                )}
              </button>
            </li>

            {/* USER NAME */}
            {loggedInUser && (
              <li className="font-semibold text-gray-800">
                {loggedInUser}
              </li>
            )}
          </ul>
        </nav>

        {/* MOBILE MENU ICON */}
        <div className="md:hidden text-xl cursor-pointer">☰</div>
      </div>
    </header>
  );
};

export default Header;
