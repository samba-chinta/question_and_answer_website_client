import React from "react";

import classes from "./Auth.module.css";

const ForgetPasswordModal = (props) => {
  return (
    <div className={classes["forget_password-modal"]}>
      <form className={classes["forget_password-modal--wrapper"]}>
        <input
          type="email"
          placeholder="domainmail@gvpce.ac.in"
          className={classes["input_field"]}
          required
        />
        <input
          type="text"
          placeholder="Enter OTP"
          className={classes["input_field"]}
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
