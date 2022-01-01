import React from "react";

import Question from "../User/Question";
import classes from "./Main.module.css";

const QueryField = (props) => {

  return <div className={classes["queryfield-wrapper"]}>
    <Question query = {props.query} isHome = {props.isHome}/>
  </div>;
};

export default QueryField;