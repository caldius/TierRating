import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./App.css";
// import image from "./testimg.png"; // ここでパス指定して変数として利用する

const Header: FC = () => (
  <div style={{ border: "dotted 5Px lime" }}>
    <h1>TierRating.com</h1>
    {/* TODO:styleごちゃごちゃ書くかリンクアイテムみたいなものを設定して並べたいかなあ？ */}
    <Link to="/">
      <span>[Home]</span>
    </Link>
    <Link to="/list">
      <span>[List]</span>
    </Link>
    <Link to="/about">
      <span>[About]</span>
    </Link>
  </div>
);

export default Header;
