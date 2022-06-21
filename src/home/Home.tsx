import React, { FC } from "react";
import { Link } from "react-router-dom";
import "../App.css";

// import image from "../testimg.png"; // ここでパス指定して変数として利用する

const Home: FC = () => (
  <>
    <Link to="/">
      <h1>[Home]</h1>
    </Link>
    <Link to="/list">
      <h1>[List]</h1>
    </Link>
    <Link to="/about">
      <h1>[About]</h1>
    </Link>
  </>
);

export default Home;
