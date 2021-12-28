import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import classes from "./Navigation.module.css";
import { authActions } from "../../store/userAuthSlice";

const Navigation = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const logoutHandler = (e) => {
    localStorage.removeItem('auth-mail');
    dispatch(authActions.logout());
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      className={classes["navigation-navbar"]}
    >
      <Container>
        <Navbar.Brand href="#home">GVP Quora</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
          style={{ width: "100%" }}
        >
          <Nav className={classes.nav}>
            <NavLink to="/" className={classes.navlink} exact="true">
              Home
            </NavLink>
            {!isLoggedIn && (
              <NavLink to="/login" className={classes.navlink} exact="true">
                Login
              </NavLink>
            )}
            {!isLoggedIn && (
              <NavLink to="/register" className={classes.navlink} exact="true">
                Register
              </NavLink>
            )}
            {isLoggedIn && (
              <NavLink
                to="/myquestions"
                className={classes.navlink}
                exact="true"
              >
                My Questions
              </NavLink>
            )}
            {isLoggedIn && (
              <NavLink to="/profile" className={classes.navlink} exact="true">
                My Profile
              </NavLink>
            )}
            {isLoggedIn && (
              <button onClick={logoutHandler} className={classes["logout-btn"]}>
                Logout
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
