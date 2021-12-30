import React, { useState } from "react";
import ReactDOM from "react-dom";

import classes from "./Auth.module.css";
import MessageModal from "../UI/MessageModal";

const ForgetPasswordModal = (props) => {
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const userEmailHandler = (e) => setUserEmail(e.target.value);

  const sendOTP = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/login/forgetpassword/${userEmail}`
      );

      if (!res.ok) {
        throw new Error(res.status);
      }

      const data = await res.json();
      localStorage.setItem("reset-mail", userEmail);
      setIsOTPSent(true);
      return data;
    } catch (err) {
      return err;
    }
  };

  const formSubmitHandler = (e) => {
    sendOTP()
      .then((data) => {
        window.location = "/resetpassword";
      })
      .catch((err) => console.log(err));
    e.preventDefault();
  };

  return (
    <div className={classes["forget_password-modal"]}>
      {isOTPSent &&
        ReactDOM.createPortal(
          <MessageModal message="OTP Sent" color="green" />,
          document.getElementById("message")
        )}
      <form
        className={classes["forget_password-modal--wrapper"]}
        onSubmit={formSubmitHandler}
      >
        <input
          type="email"
          placeholder="domainmail@gvpce.ac.in"
          className={classes["input_field"]}
          onChange={userEmailHandler}
          required
        />
        <input
          type="submit"
          value="Continue"
          className={classes["submit-btn"]}
        />
      </form>
    </div>
  );
};

export default ForgetPasswordModal;
