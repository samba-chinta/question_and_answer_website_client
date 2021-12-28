import React, { useState } from "react";

import classes from "./AskQuestionModal.module.css";

const AskQuestionModal = () => {
  const [userQuestion, setUserQuestion] = useState("");
  // const [questionTags, setQuestionTags] = useState({
  //   tags: [],
  // });
  // const [seletedFile, setSeletedFile] = useState();
  // const [isFileSelected, setIsFileSelected] = useState(false);

  const userQuestionHandler = (e) => {
    setUserQuestion(e.target.value);
  };

  // const userQuestionTagsHandler = (e) => {
  //   setQuestionTags((prevState) => ({
  //     prevState.tags.push({ })
  //   }))
  // }

  const selectedFileHandler = (e) => {
    console.log(e);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(userQuestion);
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
          placeholder="Enter Tags related to question"
        />
        <input type="file" name="file" onChange={selectedFileHandler} />
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
