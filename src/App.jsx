import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PorductPage from "./page/PorductPage";
import Home from "./page/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ContantctPage from "./page/ContantctPage";
import Landing from "./page/AboutPage";
import Detail from "./page/Detail";
import Counter from "./page/Counter";
import Profile from "./page/Profile";
import { useAuth } from "./utils/store/useAuth";
import Welcome from "./page/ProfilePage";
import AuthRouter from "./auth/AuthRouter";
import AuthUser from "./auth/AuthUser";
import Keranjang from "./components/Keranjang";
import { useCart } from "./utils/store/useCart";

const App = () => {
  const { fetchUser } = useAuth();

  const { fetchcart } = useCart();

  useEffect(() => {
    fetchUser();
  }, [fetchUser, fetchcart]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<PorductPage />} />

        <Route path="/contac" element={<ContantctPage />} />
        <Route path="/about" element={<Landing />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/profile" element={<Profile />} />
        <Route element={<AuthUser />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<AuthRouter />}>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/keranjang" element={<Keranjang />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
