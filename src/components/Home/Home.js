import React from "react";
import { Link } from "react-router-dom";

import classes from "./Home.module.css";

const Home = (props) => {

  return (
    <div className={classes.home}>
      <div className={classes["home-text"]}>
        Get Answers to your Questions from your Peers
        <Link to="/register" className={classes.register}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
