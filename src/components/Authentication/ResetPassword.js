import React, { useState } from "react";
import { Link } from "react-router-dom";

import classes from "./Auth.module.css";

const ResetPassword = () => {
  const [isReset, setIsReset] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [OTP, setOTP] = useState();

  const userPasswordHandler = (e) => setUserPassword(e.target.value);

  const otpHandler = (e) => setOTP(e.target.value);

  const resetPasswordHandler = async () => {
    try {
      const res = await fetch("http://localhost:4000/login/resetpassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("reset-mail"),
          newPassword: userPassword,
          otp: OTP,
        }),
      });

      if (!res.ok) {
        throw new Error(res.status);
      }

      const data = await res.json();
      localStorage.removeItem("reset-mail");
      setIsReset(true);
      return data;
    } catch (err) {
      return err;
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    resetPasswordHandler()
      .then((data) => {})
      .catch((err) => {});
  };

  return (
    <div className={classes["form_wrapper"]}>
      {isReset && (
        <div className={classes["redirect-wrapper"]}>
          <div> Your are successfully reset password </div>
          <Link to="/login" className={classes["redirect-link"]}>
            Click Here to Login
          </Link>
        </div>
      )}
      {!isReset && (
        <form onSubmit={formSubmitHandler} className={classes.form}>
          <h2>Reset Password</h2>
          <input
            type="password"
            placeholder="Enter New Password"
            className={classes["input_field"]}
            onChange={userPasswordHandler}
            value={userPassword}
            required
          />
          <input
            type="text"
            placeholder="Enter OTP"
            className={classes["input_field"]}
            onChange={otpHandler}
          />
          <input
            type="submit"
            value="Reset Password"
            className={classes["submit-btn"]}
          />
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
