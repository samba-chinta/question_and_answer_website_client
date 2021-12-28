import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import Navigation from "./components/Navigation/Navigation";
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";
import Home from "./components/Home/Home";
import Logout from "./components/Authentication/Logout";
import PageNotFound from "./components/UI/PageNotFound";
import Profile from "./components/Profile/Profile";
import Main from "./components/Main/Main";
import { authActions } from "./store/userAuthSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  // checking whether user is loggedin or not
  useEffect(() => {
    const email = localStorage.getItem("auth-mail");
    if (email) {
      dispatch(
        authActions.login({
          email: email,
        })
      );
    }
  });

  return (
    <div>
      <Navigation />
      <Routes>
        {!isLoggedIn && <Route path="/" element={<Home />} exact />}
        {!isLoggedIn && <Route path="/login" element={<Login />} exact />}
        {!isLoggedIn && <Route path="/register" element={<Register />} exact />}
        {isLoggedIn && <Route path="/" element={<Main />} exact />}
        {isLoggedIn && (
          <Route
            path="/myquestions"
            element={<h1>My questions Page</h1>}
            exact
          />
        )}
        {isLoggedIn && (
          <Route path="/profile" element={<Profile/>} exact />
        )}
        {isLoggedIn && <Route path="/logout" element={<Logout />} exact />}
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
