import React, { FC } from "react";
import "./App.css";
// import { BrowserRouter, Route } from "react-router-dom";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./home/Home";
import About from "./about/About";
import PageList from "./page-list/PageList";
import Header from "./Header";
// import Create from "./create/Create";
import Pages from "./pages/Pages";
import New from "./new/New";
import Edit from "./edit/Edit";

const App: FC = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/new" element={<New />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/list" element={<PageList />} />
      {/* <Route path="/create" element={<Create />} /> */}
      <Route path="/pages/:pageId" element={<Pages />} />
    </Routes>
  </BrowserRouter>
);

export default App;
