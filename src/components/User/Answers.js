import React from "react";

import classes from "./Answers.module.css";

const Answers = props => {

  return (
    <div className={classes['answers-wrapper']}>
      <div className={classes['answers']}>
        <p>{props.index}: {props.answer}</p>
        <small>By: {props.by}</small>
      </div>
    </div>
  )
}

export default Answers;