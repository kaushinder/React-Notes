import { LOGO_URL } from "../utils/constants";
import { useState, useEffect, use } from "react";
import { Link } from "react-router-dom";

const Header = () => {

  const [btnNameReact, setBtnNameReact] = useState("Login");
  console.log("Header rendered");

  useEffect(() => {
    console.log("useEffect called");
  }, [btnNameReact]);

  return (
    <div className="header">
      <div>
        <img alt="Food img" className="logo" src={LOGO_URL}></img>
      </div>
      <div className="nav-items">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li>Cart</li>
          <button className="login" onClick={() => {btnNameReact == "Login"
          ? setBtnNameReact("Logout")
          : setBtnNameReact("Login");
          }}
          >{btnNameReact}</button>
        </ul>
      </div>
    </div>
  );
};

export default Header;