import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PorductPage from "./page/PorductPage";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import ContantctPage from "./page/ContantctPage";
import Landing from "./page/AboutPage";
import Detail from "./page/Detail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<PorductPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contac" element={<ContantctPage />} />
        <Route path="/about" element={<Landing />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
