import React from "react";

import classes from "./Question.module.css";

const Question = (props) => {
  return (
    <div className={classes["question-wrapper"]}>
      <div>
        <h4 className={classes.question}>{props.question}</h4>
      </div>
      <small className={classes.askedby}>by: {props.by}</small>
      {/* <p>
        <b>Tags</b>
        {props.tags.map(tag => {
          return <span>{tag}</span>
        })}
      </p> */}
      <div className={classes.addons}>
        <b>Addons: </b>
        {props.addOns}
      </div>
      <form className={classes.answerForm}>
        <input type="text" placeholder="Answer the question"/>
        <input type="submit" value="Answer it"/>
      </form>
    </div>
  );
};

export default Question;
