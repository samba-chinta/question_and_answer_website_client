import React, { useState, useEffect } from "react";

import classes from "./Answers.module.css";

const Answers = (props) => {
  const { answer, answered_by: by, likes } = props.userAnswer;
  const [answeredUserEmail, setAnsweredUserEmail] = useState('');

  useEffect(() => {
    const getUserEmail = async () => {
      try{
        const res = await fetch(`http://localhost:4000/getuser/${by}`)
        if(!res.ok) {
          throw new Error(res.status)
        }
        const user = await res.json()

        setAnsweredUserEmail(user.email)
      } catch(err) {
        console.log(err)
      }
    }
    getUserEmail()
  }, [by])

  return (
    <div className={classes["answers-wrapper"]}>
      <div className={classes["answers"]}>
        <p>
        <small>&#128073;</small>
        {
          answer
        }</p>
        <small>By: {answeredUserEmail}</small>
      </div>
    </div>
  );
};

export default Answers;
