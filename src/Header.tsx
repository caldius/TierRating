import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./App.css";
// import image from "./testimg.png"; // ここでパス指定して変数として利用する

const Header: FC = () => (
  <div style={{ border: "dotted 5Px lime" }}>
    <h1>TierRating.com</h1>
    <a href="/">Home</a>

    <Link to="/list">[List] </Link>
    <Link to="/about">[About]</Link>
  </div>
);

export default Header;
