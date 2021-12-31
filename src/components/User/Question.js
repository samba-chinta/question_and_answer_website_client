import React, { useState, useEffect } from "react";

import classes from "./Question.module.css";
import Answers from "./Answers";

const Question = (props) => {
  const [isOpened, setIsOpened] = useState(false);
  const [askedUserEmail, setAskedUserEmail] = useState('');

  const { question, user_id: by, addOns, tags } = props.query;
  const numberOfAnswers = props.query.answer.length;

  useEffect(() => {
    const getUserEmail = async () => {
      try{
        const res = await fetch(`http://localhost:4000/getuser/${by}`)
        if(!res.ok) {
          throw new Error(res.status)
        }
        const user = await res.json()

        setAskedUserEmail(user.email)
      } catch(err) {
        console.log(err)
      }
    }
    getUserEmail()
  }, [by])

  const openAnswersHandler = () => setIsOpened((prev) => !prev);
  return (
    <div className={classes["question-wrapper"]}>
      <div>
        <h4 className={classes.question}>{question}</h4>
      </div>
      <small className={classes.askedby}>by: {askedUserEmail}</small>
      <p>
        <b>Tags: </b>
        {tags.map(tag => {
          return <span key={Math.random().toString()}>{`${tag}, `}</span>
        })}
      </p>
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
          {props.query.answer.map((ans) => {
            return (
              <Answers
                userAnswer = {ans}
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
