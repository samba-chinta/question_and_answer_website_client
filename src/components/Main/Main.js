import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import classes from "./Main.module.css";
import AskQuestionModal from "../User/AskQuestionModal";
import QueryField from "./QueryField";
// import { data } from "./data";
// import plus from "../../resources/plus.svg"

const Main = (props) => {
  const [recentQueries, setRecentQueries] = useState([]);
  const [isAskQstnBtnClicked, setIsAskQstnBtnClicked] = useState(false);

  const askQuestionButtonHandler = () => {
    setIsAskQstnBtnClicked(!isAskQstnBtnClicked);
  };

  useEffect(() => {
    const getQueries = async () => {
      try{
        const res = await fetch('http://localhost:4000/queries');
        
        if(!res.ok) {
          throw new Error(res.status);
        }

        const q = await res.json();

        setRecentQueries(q.data)
      } catch(err) {
        console.log(err);
      }
    }
    getQueries();
  }, [])

  return (
    <div className={classes["main-wrapper"]}>
      {isAskQstnBtnClicked &&
        ReactDOM.createPortal(
          <AskQuestionModal />,
          document.getElementById("askquestion")
        )}
      <div className={classes["query-wrapper"]}>
        {recentQueries ? recentQueries.map((q) => {
          return <QueryField query={q} key={Math.random().toString()} />;
        }): ''}
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
