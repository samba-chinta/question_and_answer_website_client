import React, { useState, useEffect } from "react";

import classes from "./Main.module.css";
import QueryField from "./QueryField";

const UserQueries = (props) => {
  const [userQuestions, setUserQuestions] = useState([]);

  const token = localStorage.getItem('auth-token');
  const userId = JSON.parse(token).id ;

  useEffect(() => {
    const getQueries = async () => {
      try{
        const res = await fetch(`https://college-miniproject.herokuapp.com/userqueries/${userId}`);
        
        if(!res.ok) {
          throw new Error(res.status);
        }

        const q = await res.json();

        setUserQuestions(q.data.reverse())
      } catch(err) {
        console.log(err);
      }
    }
    getQueries();
  }, [userId])
  
  return (
    <div className={classes["main-wrapper"]}>
      <div className={classes["query-wrapper"]}>
        {userQuestions.length !== 0 ? userQuestions.map((q) => {
          return <QueryField query={q} key={Math.random().toString()} isHome="false"/>;
        }): <h1>You haven't questioned anything!</h1>}
      </div>
    </div>
  );
};

export default UserQueries;
