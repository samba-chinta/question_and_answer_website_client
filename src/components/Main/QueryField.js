import React from "react";

import Question from "../User/Question";
import classes from "./Main.module.css";
import Trash from "../../resources/Trash";

const QueryField = (props) => {
  const isHome = props.isHome;
  const { _id } = props.query;
  // console.log(qstn_id)
  const questionRemoveHandler = async () => {
    try {
      const res = await fetch("https://college-miniproject.herokuapp.com/deletequery", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qstn_id: _id,
        }),
      });

      if (!res.ok) {
        throw new Error(res.status);
      }

      const data = await res.json();
      console.log(data);
      // window.location = "http://localhost:3000/myquestions";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes["queryfield-wrapper"]}>
      <Question query={props.query} isHome={props.isHome} />
      {isHome === "false" && (
        <button
          className={classes["delete-btn"]}
          onClick={questionRemoveHandler}
        >
          <Trash />
        </button>
      )}
    </div>
  );
};

export default QueryField;
