import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import classes from "./Question.module.css";
import Answers from "./Answers";
import MessageModal from "../UI/MessageModal";
import Dropdown from "../../resources/Dropdown";

const Question = (props) => {
  const [isOpened, setIsOpened] = useState(false);
  const [askedUserEmail, setAskedUserEmail] = useState("");
  const [enteredAnswer, setEnteredAnswer] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isErrorOccurs, setIsErrorOccurs] = useState(false);

  const { _id: question_id, question, user_id: by, addOns, tags } = props.query;
  const numberOfAnswers = props.query.answer.length;

  const token = localStorage.getItem("auth-token");
  const answering_user_id = JSON.parse(token).id;

  useEffect(() => {
    setTimeout(() => {
      setIsSuccessful(false);
      setIsErrorOccurs(false);
    }, 1000);
  }, [isSuccessful, isErrorOccurs]);

  const saveAnswer = async (payload) => {
    try {
      const res = await fetch("http://localhost:4000/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(res.status);
      }
      const data = await res.json();
      
      return data;
    } catch (err) {
      return err;
    }
  };

  const enterAnswerHandler = (e) => {
    setEnteredAnswer(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (enteredAnswer.trim() === "") {
      setIsErrorOccurs(true);
      return;
    }
    saveAnswer({
      answer: enteredAnswer,
      question_id,
      answered_by: answering_user_id,
      asked_by: askedUserEmail
    })
      .then((res) => {
        setIsSuccessful(true);
      })
      .catch((err) => {
        setIsErrorOccurs(true);
      });
    setEnteredAnswer("");
  };

  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const res = await fetch(`http://localhost:4000/getuser/${by}`);
        if (!res.ok) {
          throw new Error(res.status);
        }
        const user = await res.json();

        setAskedUserEmail(user.email);
      } catch (err) {
        console.log(err);
      }
    };
    getUserEmail();
  }, [by]);

  const openAnswersHandler = () => setIsOpened((prev) => !prev);
  return (
    <div className={classes["question-wrapper"]}>
      {isSuccessful &&
        ReactDOM.createPortal(
          <MessageModal message="Successfully Answered" color="green" />,
          document.getElementById("message")
        )}
      {isErrorOccurs &&
        ReactDOM.createPortal(
          <MessageModal message="Error Occured" color="red" />,
          document.getElementById("message")
        )}
      <div>
        <h4 className={classes.question}>{question}</h4>
      </div>
      <small className={classes.askedby}>by: {askedUserEmail}</small>
      <p>
        <b>Tags: </b>
        {tags.map((tag) => {
          return <span key={Math.random().toString()}>{`${tag}, `}</span>;
        })}
      </p>
      <div className={classes.addons}>
        <b>Addons: </b>
        {addOns}
      </div>
      {props.isHome === 'true' && (
        <form className={classes.answerForm} onSubmit={formSubmitHandler}>
          <input
            type="text"
            placeholder="Answer the question"
            onChange={enterAnswerHandler}
            value={enteredAnswer}
          />
          <input type="submit" value="Answer it" />
        </form>
      )}
      <div className={classes["answers-count"]} onClick={openAnswersHandler}>
        <Dropdown />
        Answers: {numberOfAnswers}
      </div>
      {isOpened && (
        <div>
          {props.query.answer.map((ans) => {
            return <Answers userAnswer={ans} key={Math.random().toString()}/>;
          })}
        </div>
      )}
    </div>
  );
};

export default Question;
