import React, { useState } from "react";

import classes from "./Question.module.css";
import Answers from "./Answers";

const Question = (props) => {
  const [isOpened, setIsOpened] = useState(false);
  const { question, askedBy: by, addOns } = props.query;
  const numberOfAnswers = props.query.answers.length;

  const openAnswersHandler = () => setIsOpened((prev) => !prev);

  return (
    <div className={classes["question-wrapper"]}>
      <div>
        <h4 className={classes.question}>{question}</h4>
      </div>
      <small className={classes.askedby}>by: {by}</small>
      {/* <p>
        <b>Tags</b>
        {props.tags.map(tag => {
          return <span>{tag}</span>
        })}
      </p> */}
      <div className={classes.addons}>
        <b>Addons: </b>
        {addOns}
      </div>
      <form className={classes.answerForm}>
        <input type="text" placeholder="Answer the question" />
        <input type="submit" value="Answer it" />
      </form>
      <div className={classes["answers-count"]} onClick={openAnswersHandler}>
        Answers: {numberOfAnswers}
      </div>
      {isOpened && (
        <div>
          {props.query.answers.map((ans) => {
            return (
              <Answers
                index={props.query.answers.indexOf(ans)+1}
                answer={ans.answer}
                by={ans.answeredBy}
                key={Math.random().toString()}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Question;
