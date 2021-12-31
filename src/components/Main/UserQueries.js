import React, { useState, useEffect } from "react";

import classes from "./Main.module.css";
import QueryField from "./QueryField";

const UserQueries = (props) => {
  const [userQuestions, setUserQuestions] = useState([]);

  const token = localStorage.getItem('auth-token');
  console.log(token)
  const userId = JSON.parse(token).id ;

  console.log(userId)

  useEffect(() => {
    const getQueries = async () => {
      try{
        const res = await fetch(`http://localhost:4000/userqueries/${userId}`);
        
        if(!res.ok) {
          throw new Error(res.status);
        }

        const q = await res.json();
        console.log(q)
        setUserQuestions(q.data)
      } catch(err) {
        console.log(err);
      }
    }
    getQueries();
  }, [userId])
  console.log(userQuestions)
  return (
    <div className={classes["main-wrapper"]}>
      <div className={classes["query-wrapper"]}>
        {userQuestions ? userQuestions.map((q) => {
          return <QueryField query={q} key={Math.random().toString()} />;
        }): ''}
      </div>
    </div>
  );
};

export default UserQueries;
