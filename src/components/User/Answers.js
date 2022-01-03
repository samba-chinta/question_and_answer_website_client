import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import classes from "./Answers.module.css";
import Like from "../../resources/Like";
import Trash from "../../resources/Trash";

const Answers = (props) => {
  const [isEligibleForDelete, setIsEligibleForDelete] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const { answer, answered_by: by, likes, _id: id } = props.userAnswer;
  const [answeredUserEmail, setAnsweredUserEmail] = useState("");
  const token = useSelector((state) => state.email);

  // useEffect(() => {
  //   alreadyLikedHandler()
  // })

  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const res = await fetch(`https://college-miniproject.herokuapp.com/getuser/${by}`);
        if (!res.ok) {
          throw new Error(res.status);
        }
        const user = await res.json();

        if (user.email !== token) {
          setIsEligibleForDelete(false);
        }

        setAnsweredUserEmail(user.email);
      } catch (err) {
        console.log(err);
      }
    };
    getUserEmail();
  }, [by, token]);

  // const alreadyLikedHandler = async () => {
  //   try {
  //     const res = await fetch(`http://localhost:4000/isliked/${token}/${id}`)
  //     if(!res.ok) {
  //       throw new Error('Error Occured')
  //     }
  //     const data = await res.json();

  //     console.log(data)
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }

  const answerRemoveHandler = async () => {
    try {
      const res = await fetch("https://college-miniproject.herokuapp.com/deleteanswer", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answer_id: id,
        }),
      });

      if (!res.ok) {
        throw new Error(res.status);
      }

      const data = await res.json();
      console.log(data);
      window.location = "https://question-and-answer-website.vercel.app/"
    } catch (err) {
      console.log(err);
    }
  };

  const likesHandler = async () => {
    try {
      const res = await fetch("https://college-miniproject.herokuapp.com/likes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answer_id: id,
          liked_by: token
        }),
      });

      if (!res.ok) {
        throw new Error(res.status);
      }

      const data = await res.json();
      console.log(data);
      setIsLiked(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes["answers-wrapper"]}>
      <div className={classes["answers"]}>
        <ul>
          <li>
            <p>{answer}</p>
          </li>
        </ul>
        <small className={classes["answered_by"]}>
          By: {answeredUserEmail}
        </small>
        <div className={classes["answer-controls"]}>
          <button
            className={
              isLiked ? `${classes["like-btn"]} ${classes["liked"]}` : classes["like-btn"]
            }
            onClick={likesHandler}
          >
            <Like />
            {likes}
          </button>
          {isEligibleForDelete && (
            <button
              className={classes["delete-btn"]}
              onClick={answerRemoveHandler}
            >
              <Trash />
            </button>
          )}
          {!isEligibleForDelete && (
            <button className={classes["delete-btn"]} disabled>
              <Trash />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Answers;
