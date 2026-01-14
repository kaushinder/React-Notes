import { LOGO_URL } from "../utils/constant.js";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import UserContext from "../utils/UserContext.js";

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

const Header = () => {

  const [btnNameReact, setBtnNameReact] = useState("Login");

  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);
  console.log(loggedInUser);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={LOGO_URL}
            alt="Food Logo"
            className="h-14 w-14 rounded-full border-2 border-orange-500 shadow-sm"
          />
          <span className="text-xl font-bold text-gray-800">
            Food<span className="text-orange-500">Villa</span>
          </span>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex items-center gap-8 text-base font-medium text-gray-700">
            {/* Online Status */}
            <li className="flex items-center gap-1">
              <MdOnlinePrediction className="text-lg text-green-500" />
              <span>{onlineStatus ? "Online" : "Offline"}</span>
            </li>

            <li>
              <Link
                to="/"
                className="flex items-center gap-1 hover:text-orange-500 transition"
              >
                <FaHome /> Home
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="flex items-center gap-1 hover:text-orange-500 transition"
              >
                <FaInfoCircle /> About
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="flex items-center gap-1 hover:text-orange-500 transition"
              >
                <FaPhoneAlt /> Contact
              </Link>
            </li>

            <li>
              <Link
                to="/grocery"
                className="flex items-center gap-1 hover:text-orange-500 transition"
              >
                <FaStore /> Grocery
              </Link>
            </li>

            <li>
              <Link
                to="/cart"
                className="flex items-center gap-1 hover:text-orange-500 transition"
              >
                <FaShoppingCart /> Cart
              </Link>
            </li>

            {/* Login / Logout Button */}
            <li>
              <button
                onClick={() =>
                  btnNameReact === "Login"
                    ? setBtnNameReact("Logout")
                    : setBtnNameReact("Login")
                }
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 px-6 py-2 text-white shadow-md transition hover:scale-105 hover:shadow-lg active:scale-95"
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
            <li className="font-semibold text-gray-800">
              {loggedInUser}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
