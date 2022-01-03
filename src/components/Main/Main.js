import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import classes from "./Main.module.css";
import AskQuestionModal from "../User/AskQuestionModal";
import QueryField from "./QueryField";
import AddIcon from "../../resources/AddIcon"

const Main = (props) => {
  const [recentQueries, setRecentQueries] = useState([]);
  const [isAskQstnBtnClicked, setIsAskQstnBtnClicked] = useState(false);

  const askQuestionButtonHandler = () => {
    setIsAskQstnBtnClicked(!isAskQstnBtnClicked);
  };

  useEffect(() => {
    const getQueries = async () => {
      try{
        const res = await fetch('https://college-miniproject.herokuapp.com/queries');
        
        if(!res.ok) {
          throw new Error(res.status);
        }

        const q = await res.json();
        
        setRecentQueries(q.data.reverse())
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
        {recentQueries.length !== 0 ? recentQueries.map((q) => {
          return <QueryField query={q} key={Math.random().toString()} isHome="true"/>;
        }): <h1>No Questions are Added</h1>}
      </div>
      <button
        className={classes["ask-question__btn"]}
        onClick={askQuestionButtonHandler}
      >
        <AddIcon/>
      </button>
    </div>
  );
};

export default Main;
