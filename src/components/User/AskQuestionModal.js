import React, { useState } from "react";

import classes from "./AskQuestionModal.module.css";

const AskQuestionModal = () => {
  const [userQuestion, setUserQuestion] = useState("");
  const [questionTags, setQuestionTags] = useState([]);

  const userQuestionHandler = (e) => {
    setUserQuestion(e.target.value);
  };

  const formSubmitHandler = (e) => {
    const tags = document.querySelector("#qstnTags").value;
    for (let tag of tags.split(" ")) {
      setQuestionTags((prev) => [...prev, tag]);
    }
    console.log(userQuestion);
    console.log(questionTags);
    e.preventDefault();
  };

  return (
    <div className={classes["askqstn-wrapper"]}>
      <form onSubmit={formSubmitHandler} className={classes["form-wrapper"]}>
        <h2>Ask Your Question</h2>
        <label htmlFor="question">
          Question*
          <input
            type="text"
            name="question"
            className={classes["input-field"]}
            onChange={userQuestionHandler}
          />
        </label>
        <label htmlFor="tags">
          Tags Related to your question*
          <input
            type="text"
            name="tags"
            className={classes["input-field"]}
            id="qstnTags"
          />
        </label>
        <label htmlFor="links">
          Reference Link
          <input
            type="text"
            name="lins"
            className={classes["input-field"]}
            id="links"
          />
        </label>
        <label>
          Any Additional details
          <textarea rows={5} cols={30}></textarea>
        </label>
        <label htmlFor="file">
          Upload your reference files if any
          <input type="file" name="file" />
        </label>
        <input
          type="submit"
          value="Ask Question"
          className={classes["submit-btn"]}
        />
      </form>
    </div>
  );
};

export default AskQuestionModal;
