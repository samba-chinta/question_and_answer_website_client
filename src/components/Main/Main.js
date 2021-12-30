import React, { useState } from "react";
import ReactDOM from "react-dom";

import classes from "./Main.module.css";
import AskQuestionModal from "../User/AskQuestionModal";
import QueryField from "./QueryField";
import { data } from "./data";
// import plus from "../../resources/plus.svg"

const Main = (props) => {
  const [isAskQstnBtnClicked, setIsAskQstnBtnClicked] = useState(false);

  const askQuestionButtonHandler = () => {
    setIsAskQstnBtnClicked(!isAskQstnBtnClicked);
  };

  return (
    <div className={classes["main-wrapper"]}>
      {isAskQstnBtnClicked &&
        ReactDOM.createPortal(
          <AskQuestionModal />,
          document.getElementById("askquestion")
        )}
      <div className={classes["query-wrapper"]}>
        {data.map((q) => {
          return <QueryField query={q} key={Math.random().toString()} />;
        })}
      </div>
      <button
        className={classes["ask-question__btn"]}
        onClick={askQuestionButtonHandler}
      >
        Ask Question
      </button>
    </div>
  );
};

export default Main;
