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

  const {
    _id: question_id,
    question,
    user_id: by,
    link,
    tags,
    info,
  } = props.query;
  const numberOfAnswers = props.query.answer.length;

  const sortAnswersHandler = (arr) => {
    if (arr.length <= 1) {
      return arr;
    }
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length-i-1; j++) {
        if (arr[j].likes < arr[j+1].likes) {
          let temp = arr[j];
          arr[j] = arr[j+1];
          arr[j+1] = temp;
        }
      }
    }
    return arr;
  }

  const sorted_answers = sortAnswersHandler(props.query.answer)
  
  const token = localStorage.getItem("auth-token");
  const answering_user_id = JSON.parse(token).id;
  // const answering_user_email = JSON.parse(token).email;

  // console.log(props.query.answer.sort((ans, ans1) => (ans.likes - ans1.likes)))
  // const a = props.query.answer.sort((ans, ans1) => (ans.likes > ans1.likes) ? 1 : -1)
  // console.log(a)

  useEffect(() => {
    setTimeout(() => {
      setIsSuccessful(false);
      setIsErrorOccurs(false);
    }, 1000);
  }, [isSuccessful, isErrorOccurs]);

  const saveAnswer = async (payload) => {
    try {
      const res = await fetch(
        "https://qstn-and-ans.herokuapp.com/answer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
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
      asked_by: askedUserEmail,
    })
      .then((res) => {
        setIsSuccessful(true);
        window.location = "https://question-and-answer-website.vercel.app/";
      })
      .catch((err) => {
        setIsErrorOccurs(true);
      });
    setEnteredAnswer("");
  };

  const getTagsString = (tags) => {
    let str = "";
    for (let tag of tags) {
      str += tag + ", ";
    }
    return str.slice(0, str.length - 2);
  };

  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const res = await fetch(
          `https://college-miniproject.herokuapp.com/getuser/${by}`
        );
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
      {props.isHome === "true" && (
        <small className={classes.askedby}>by: {askedUserEmail}</small>
      )}
      {tags.length !== 0 && (
        <p>
          <b>Tags: </b>
          {/* {tags.map((tag) => {
            return <span key={Math.random().toString()}>{`${tag} `}</span>;
          })} */}
          <span>{getTagsString(tags)}</span>
        </p>
      )}
      {link !== "" && (
        <div className={classes.addons}>
          <b>Reference Link: </b>
          <a href={link}>{link}</a>
        </div>
      )}
      {info !== "" && (
        <div className={classes.info}>
          <h5>Description: </h5>
          {info}
        </div>
      )}
      {props.isHome === "true" && (
        <form className={classes.answerForm} onSubmit={formSubmitHandler}>
          {/* <input
            type="text"
            placeholder="Answer the question"
            onChange={enterAnswerHandler}
            value={enteredAnswer}
          /> */}
          <textarea
            placeholder="Answer the Question"
            onChange={enterAnswerHandler}
            value={enteredAnswer}
            className={classes["answer-field"]}
          ></textarea>
          <input type="submit" value="Answer it" />
        </form>
      )}
      <div className={classes["answers-count"]} onClick={openAnswersHandler}>
        <Dropdown />
        Answers: {numberOfAnswers}
      </div>
      {isOpened && (
        <div>
          {sorted_answers.map((ans) => {
            return <Answers userAnswer={ans} key={Math.random().toString()} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Question;
