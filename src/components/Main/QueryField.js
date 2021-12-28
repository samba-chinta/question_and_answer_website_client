import React from "react";

import Question from "../User/Question";
import classes from "./Main.module.css";

const QueryField = (props) => {
  const { question, askedBy: by, addOns } = props.query;
  console.log({
    question,
    by,
    addOns,
  });

  return <div className={classes["queryfield-wrapper"]}>
    <Question question={question} by={by} addOns={addOns} />
  </div>;
};

export default QueryField;