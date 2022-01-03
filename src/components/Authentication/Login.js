import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./Auth.module.css";
import ForgetPasswordModal from "./ForgetPasswordModal";
import MessageModal from "../UI/MessageModal";
import { authActions } from "../../store/userAuthSlice";

const Login = (props) => {
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isForgetPasswordClicked, setIsForgetPasswordClicked] = useState(false);

  const [isLoading, setIsLoading] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const dispatchLogin = (payload) => {
    console.log(payload)
    dispatch(authActions.login({
      ...payload,
    }))
  }

  const sendRequest = async (payload) => {
    setIsLoading(true);
    try {
      const res = await fetch("https://college-miniproject.herokuapp.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(res.message);
      }

      const data = await res.json();

      console.log(data)
      setIsLoading(false);
      setIsSuccessful(true);
      localStorage.setItem('auth-token', JSON.stringify({
        userEmail,
        id: data.id
      }));
      dispatchLogin({
        email: userEmail,
      })
      // return res;
    } catch (err) {
      setIsLoading(false);
      setHasError("Authentication Failed");
      // return err;
    }
  };

  // const sendRequest = async (payload) => {
  //   setIsLoading(true);
  //   await fetch("http://localhost:4000/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(payload),
  //   })
  //   .then(res => console.log(res.json()))
  //   .then(data => console.log(data.id))
  //   .catch(err => console.log(err))
  //   setIsLoading(false);
  // };

  const userEmailHandler = (e) => {
    setUserEmail(e.target.value);
  };

  const userPasswordHandler = (e) => {
    setUserPassword(e.target.value);
  };

  const forgetPasswordHandler = (e) => {
    setIsForgetPasswordClicked((prevState) => !prevState);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const payload = {
      email: userEmail,
      password: userPassword,
    };
    sendRequest(payload)
  };

  return (
    <div className={classes["form_wrapper"]}>
      {isLoading &&
        ReactDOM.createPortal(
          <MessageModal message="Logging..." color="indigo" />,
          document.getElementById("message")
        )}
      {isSuccessful && <Navigate to="/" />}
      {hasError &&
        ReactDOM.createPortal(
          <MessageModal message={hasError} color="red" />,
          document.getElementById("message")
        )}
      {isForgetPasswordClicked &&
        ReactDOM.createPortal(
          <ForgetPasswordModal />,
          document.getElementById("overlay")
        )}
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="domainmail@gvpce.ac.in"
          className={classes["input_field"]}
          onChange={userEmailHandler}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          className={classes["input_field"]}
          onChange={userPasswordHandler}
          required
        />
        <input type="submit" value="Login" className={classes["submit-btn"]} />
        <button type="button" onClick={forgetPasswordHandler}>
          Forget Password ?
        </button>
        <Link to="/register" className={classes.link}>
          Don't Have an Account ? Register
        </Link>
      </form>
    </div>
  );
};

export default Login;
