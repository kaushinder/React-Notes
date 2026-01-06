import { LOGO_URL } from "../utils/constant.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  // console.log("Header rendered");

  //  If no dependency array is provided, the useEffect will run after every render of the component.
  // If dependency array is empty, the useEffect will run only once after the initial render(just once).
  // If there are dependencies in the array, the useEffect will run after the initial render and whenever any of the dependencies change.
  useEffect(() => {
    // console.log("useEffect called");
  }, [btnNameReact]);

  return (
    <div className="header">
      <div>
        <img alt="Food img" className="logo" src={LOGO_URL}></img>
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li><Link to="/cart">Cart</Link></li>
          <button
            className="login"
            onClick={() => {
              btnNameReact == "Login"
                ? setBtnNameReact("Logout")
                : setBtnNameReact("Login");
            }}
          >
            {btnNameReact}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;