import React, { useState } from "react";

import classes from "./AskQuestionModal.module.css";

const AskQuestionModal = () => {
  const [userQuestion, setUserQuestion] = useState("");
  const [questionTags, setQuestionTags] = useState([]);
  const [refLink, setRefLink] = useState("");
  const [queryDetails, setQueryDetails] = useState("");
  // const [selectedFile, setSelectedFile] = useState({});

  const token = localStorage.getItem("auth-token");
  const user_id = JSON.parse(token).id;

  const userQuestionHandler = (e) => {
    setUserQuestion(e.target.value);
  };

  const refLinkHandler = (e) => {
    setRefLink(e.target.value);
  };

  const queryDetailsHandler = (e) => {
    setQueryDetails(e.target.value);
  };

  // const selectedFileHandler = (e) => {
  //   console.log(e.target.files[0])
  //   setSelectedFile({...e.target.files[0]});
  // };

  const askQuestionReqHandler = async () => {
    try {
      const res = await fetch("http://localhost:4000/createquery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          question: userQuestion,
          tags: questionTags,
          link: refLink === "" ? "" : refLink,
          info: queryDetails === "" ? "" : queryDetails,
          // file: "Hi",
        }),
      });

      if (!res.ok) {
        throw new Error(res.status);
      }

      const data = await res.json();

      if(data.status === 201) {
        window.location = "http://localhost:3000/"
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formSubmitHandler = (e) => {
    const tags = document.getElementById("qstnTags").value;
    for (let tag of tags.split(" ")) {
      setQuestionTags((prev) => [...prev, tag]);
    }

    askQuestionReqHandler();
    e.preventDefault();
    setUserQuestion("");
    setQuestionTags([]);
    setRefLink("");
    setQueryDetails("");
  };

  return (
    <div className={classes["askqstn-wrapper"]}>
      <form
        onSubmit={formSubmitHandler}
        className={classes["form-wrapper"]}
        encType="multipart/form-data"
      >
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
            onChange={refLinkHandler}
          />
        </label>
        <label>
          Any Additional details
          <textarea
            rows={2}
            cols={30}
            onChange={queryDetailsHandler}
            className={classes['textarea']}
          ></textarea>
        </label>
        {/* <label htmlFor="myfile">
          Upload your reference files if any
          <input type="file" name="myfile" onChange={selectedFileHandler} />
        </label> */}
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
