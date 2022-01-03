import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import MessageModal from "../UI/MessageModal";
import classes from "./Auth.module.css";

const branchOptions = [
  { branch: "CSE" },
  { branch: "ECE" },
  { branch: "EEE" },
  { branch: "IT" },
  { branch: "Mech" },
  { branch: "Civil" },
  { branch: "Chemical" },
];

const Register = (props) => {
  // user data
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userBranch, setUserBranch] = useState({
    branch: "CSE",
  });
  const [userStudyingYear, setUserStudyingYear] = useState("");
  const [validState, setIsValid] = useState({
    mail: true,
    password: true,
    cpassword: true,
  });

  // request states
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  // changing successful state
  useEffect(() => {
    setTimeout(() => {
      setHasError(false);
    }, 1000);
  }, [hasError]);

  // sending post request to register user
  const sendRequest = async (payload) => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(res.message);
      }
      setIsLoading(false);
      setIsSuccessful(true);
    } catch (err) {
      setIsLoading(false);
      setHasError("Error Occured");
    }
  };

  //states update functions
  const userEmailHandler = (e) => {
    setUserEmail(e.target.value);

    if (validState.mail === false) {
      setIsValid((prevState) => ({
        ...prevState,
        mail: true,
      }));
    }
  };

  const userPasswordHandler = (e) => {
    setUserPassword(e.target.value);

    if (validState.password === false) {
      setIsValid((prevState) => ({
        ...prevState,
        password: true,
      }));
    }
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);

    if (validState.cpassword === false) {
      setIsValid((prevState) => ({
        ...prevState,
        cpassword: true,
      }));
    }
  };

  const userNameHandler = (e) => {
    setUserName(e.target.value);
  };

  const userBranchHandler = (e) => {
    setUserBranch((prevState) => ({
      branch: e.target.value,
    }));
  };

  const userStudyingYearHandler = (e) => {
    setUserStudyingYear(e.target.value);
  };

  // formSubmitHandler to verify the data & send request
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const emailRegex = /[a-zA-Z0-9_-]@gvpce\.ac\.in/;

    if (!emailRegex.test(userEmail)) {
      setIsValid((prevState) => ({
        ...prevState,
        mail: false,
      }));
      return;
    }

    if (userPassword < 8) {
      setIsValid((prevState) => ({
        ...prevState,
        password: false,
      }));
      return;
    }

    if (userPassword !== confirmPassword) {
      setIsValid((prevState) => ({
        ...prevState,
        cpassword: false,
      }));
      return;
    }

    const payload = {
      email: userEmail,
      password: userPassword,
      name: userName,
      branch: userBranch.branch,
      year: userStudyingYear,
    };

    setUserEmail("");
    setUserPassword("");
    setUserName("");
    setUserBranch({
      branch: "CSE",
    });
    setConfirmPassword("");
    setUserStudyingYear("");

    sendRequest(payload);
  };

  // component
  return (
    <div className={classes["form_wrapper"]}>
      {isLoading &&
        ReactDOM.createPortal(
          <MessageModal message="Registering..." color="indigo" />,
          document.getElementById("message")
        )}
      {hasError &&
        ReactDOM.createPortal(
          <MessageModal message={hasError} color="red" />,
          document.getElementById("message")
        )}
      {isSuccessful && (
        <div className={classes["redirect-wrapper"]}>
          <div> Your are successfully registered </div>
          <Link to="/login" className={classes["redirect-link"]}>
            Click Here to Login
          </Link>
        </div>
      )}
      {!isSuccessful && (
        <form className={classes.form} onSubmit={formSubmitHandler}>
          <h2>Register</h2>
          <input
            type="email"
            placeholder="domainmail@gvpce.ac.in"
            className={classes["input_field"]}
            onChange={userEmailHandler}
            value={userEmail}
            required
          />
          {!validState.mail && (
            <small className={classes["error_message"]}>
              Invalid Email, use Domain Mail only
            </small>
          )}
          <input
            type="password"
            placeholder="Enter Password"
            className={classes["input_field"]}
            onChange={userPasswordHandler}
            value={userPassword}
            required
          />
          {!validState.password && (
            <small className={classes["error_message"]}>
              Password Length must be atleast 8
            </small>
          )}
          <input
            type="password"
            placeholder="Confirm Password"
            className={classes["input_field"]}
            onChange={confirmPasswordHandler}
            value={confirmPassword}
            required
          />
          {!validState.cpassword && (
            <small className={classes["error_message"]}>
              Both passwords must match each other
            </small>
          )}
          <input
            type="text"
            placeholder="Enter your Name"
            className={classes["input_field"]}
            onChange={userNameHandler}
            value={userName}
            required
          />
          <label htmlFor="Branch">Select your Branch:</label>
          <select
            name="Branch"
            className={classes["input_field"]}
            value={userBranch.branch}
            onChange={userBranchHandler}
          >
            {branchOptions.map((branch) => {
              return (
                <option value={branch.branch} key={Math.random().toString()}>
                  {branch.branch}
                </option>
              );
            })}
          </select>
          <input
            type="number"
            min={1}
            max={4}
            placeholder="Enter the year of studying(optional for faculty)"
            className={classes["input_field"]}
            onChange={userStudyingYearHandler}
            value={userStudyingYear}
            required
          />
          <input
            type="submit"
            value="register"
            className={classes["submit-btn"]}
          />
          <Link to="/login" className={classes["link"]}>
            Already Have An Account ? Login
          </Link>
        </form>
      )}
    </div>
  );
};

export default Register;
