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
    console.log(userQuestion)
    console.log(questionTags)
    e.preventDefault();
  };

  return (
    <div className={classes["askqstn-wrapper"]}>
      <form onSubmit={formSubmitHandler} className={classes["form-wrapper"]}>
        <h2>Ask Your Question</h2>
        <input
          type="text"
          name="question"
          className={classes["input-field"]}
          placeholder="Type your Question"
          onChange={userQuestionHandler}
        />
        <input
          type="text"
          name="tags"
          className={classes["input-field"]}
          id="qstnTags"
          placeholder="Enter Tags related to question"
        />
        {/* <input type="file" name="file" onChange={selectedFileHandler} /> */}
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
