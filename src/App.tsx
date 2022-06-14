import React, { FC } from "react";
import "./App.css";
// import { BrowserRouter, Route } from "react-router-dom";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./home/Home";
import About from "./about/About";
import List from "./list/List";
import Header from "./Header";
// import Create from "./create/Create";
import Pages from "./pages/Pages";

const App: FC = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/list" element={<List />} />
      {/* <Route path="/create" element={<Create />} /> */}
      <Route path="/pages/:pageId" element={<Pages />} />
    </Routes>
  </BrowserRouter>
);

export default App;
