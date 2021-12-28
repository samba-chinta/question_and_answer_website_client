import React from "react";
import { Link } from "react-router-dom";

import classes from "./PageNotFound.module.css";

const PageNotFound = (props) => {
  return (
    <div className={classes.wrapper}>
      <h2>Oops! Page not Found &#128528;</h2>
      <Link to="/">Click here to continue with Home Page</Link>
    </div>
  );
};

export default PageNotFound;
