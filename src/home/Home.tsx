import React, { FC } from "react";
import { Link } from "react-router-dom";
import "../App.css";

import image from "../testimg.png"; // ここでパス指定して変数として利用する

// function App() {
//   return (
const Home: FC = () => (
  <>
    <h1>This is Home</h1>

    <Link to="/about">
      <img src={image} alt="aaa" />
    </Link>
  </>
);

export default Home;
