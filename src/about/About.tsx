import React, { FC } from "react";
import { Link } from "react-router-dom";
import "../App.css";

import image from "../testimg.png"; // ここでパス指定して変数として利用する

// function App() {
//   return (
const About: FC = () => (
  <>
    <h1>This is AboutPage</h1>
    <Link to="/list">
      <img src={image} alt="aaa" />
    </Link>
  </>
);

export default About;
