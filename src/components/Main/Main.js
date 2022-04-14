import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import classes from "./Main.module.css";
import AskQuestionModal from "../User/AskQuestionModal";
import QueryField from "./QueryField";
import AddIcon from "../../resources/AddIcon";

const Main = (props) => {
  const [recentQueries, setRecentQueries] = useState([]);
  const [isAskQstnBtnClicked, setIsAskQstnBtnClicked] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchingTag, setSearchingTag] = useState()

  const askQuestionButtonHandler = () => {
    setIsAskQstnBtnClicked(!isAskQstnBtnClicked);
  };

  const searchQueryHandler = (e) => {
    if (e.target.value.length === 0) {
      setIsSearching(false)
    }
    if (e.target.value.length > 0) {
      setIsSearching(true)
    }
    setSearchingTag(e.target.value)
  }

  useEffect(() => {
    const getQueries = async () => {
      try {
        const res = await fetch(
          "https://qstn-and-ans.herokuapp.com/queries"
        );

        if (!res.ok) {
          throw new Error(res.status);
        }

        const q = await res.json();
        // console.log(q);
        setRecentQueries(q.data.reverse());
        
      } catch (err) {
        console.log(err);
      }
    };
    getQueries();
  }, []);

  return (
    <div className={classes["main-wrapper"]}>
      {isAskQstnBtnClicked &&
        ReactDOM.createPortal(
          <AskQuestionModal />,
          document.getElementById("askquestion")
        )}
      <div className={classes["query-wrapper"]}>
        <input
          type="search"
          placeholder="Search the Queries with tags:"
          className={classes["query-search"]}
          onChange ={searchQueryHandler}
        />
        {!isSearching && (recentQueries.length !== 0 ? (
          recentQueries.map((q) => {
            return (
              <QueryField
                query={q}
                key={Math.random().toString()}
                isHome="true"
              />
            );
          })
        ) : (
          <h1>No Questions are Added</h1>
        ))}
        {isSearching && (
          recentQueries.filter(query => query.tags.includes(searchingTag.toLowerCase())).map(q => {
            return (
              <QueryField
                query={q}
                key={Math.random().toString()}
                isHome="true"
              />
            );
          })
        )}
      </div>
      <button
        className={classes["ask-question__btn"]}
        onClick={askQuestionButtonHandler}
      >
        <AddIcon />
      </button>
    </div>
  );
};

export default Main;
